/**
 * CodeGraph Explorer - Application Logic
 * Handles UI interactions, event binding, and coordinates with GraphEngine
 */

// Global graph instance
let graph;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGraph();
    bindEvents();
    loadSampleData('simple');
});

function initGraph() {
    graph = new GraphEngine('graph');
}

function bindEvents() {
    // Header buttons
    document.getElementById('importBtn').addEventListener('click', () => openModal('importModal'));
    document.getElementById('exportBtn').addEventListener('click', () => openModal('exportModal'));
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('collapsed');
    });
    
    // Layout buttons
    document.querySelectorAll('.layout-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            graph.setLayout(btn.dataset.layout);
        });
    });
    
    // Settings sliders
    document.getElementById('nodeSize').addEventListener('input', (e) => {
        graph.setConfig('nodeSize', parseInt(e.target.value));
    });
    
    document.getElementById('linkDistance').addEventListener('input', (e) => {
        graph.setConfig('linkDistance', parseInt(e.target.value));
    });
    
    document.getElementById('chargeStrength').addEventListener('input', (e) => {
        graph.setConfig('chargeStrength', parseInt(e.target.value));
    });
    
    document.getElementById('showLabels').addEventListener('change', (e) => {
        graph.setConfig('showLabels', e.target.checked);
    });
    
    // Filter checkboxes
    document.querySelectorAll('.filter-item input').forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });
    
    // Graph controls
    document.getElementById('zoomIn').addEventListener('click', () => graph.zoomIn());
    document.getElementById('zoomOut').addEventListener('click', () => graph.zoomOut());
    document.getElementById('fitView').addEventListener('click', () => graph.fitView());
    document.getElementById('resetView').addEventListener('click', () => graph.resetView());
    
    // Search
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            graph.searchNodes(e.target.value);
        }, 300);
    });
    
    // Details panel
    document.getElementById('closeDetails').addEventListener('click', () => {
        document.getElementById('detailsPanel').classList.add('collapsed');
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Import modal tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${tab}Tab`).classList.add('active');
        });
    });
    
    // JSON file load
    document.getElementById('loadJsonFile').addEventListener('click', () => {
        document.getElementById('jsonFile').click();
    });
    
    document.getElementById('jsonFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('jsonInput').value = event.target.result;
            };
            reader.readAsText(file);
        }
    });
    
    // Confirm import
    document.getElementById('confirmImport').addEventListener('click', () => {
        const activeTab = document.querySelector('.tab-content.active').id;
        
        if (activeTab === 'jsonTab') {
            importFromJSON();
        } else if (activeTab === 'githubTab') {
            importFromGitHub();
        }
    });
    
    // Sample buttons
    document.querySelectorAll('.sample-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadSampleData(btn.dataset.sample);
            closeModal('importModal');
        });
    });
    
    // Export buttons
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            if (format === 'png') graph.exportToPNG();
            else if (format === 'svg') graph.exportToSVG();
            else if (format === 'json') graph.exportToJSON();
            closeModal('exportModal');
        });
    });
    
    // Close modals on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'o':
                    e.preventDefault();
                    openModal('importModal');
                    break;
                case 's':
                    e.preventDefault();
                    openModal('exportModal');
                    break;
                case '0':
                    e.preventDefault();
                    graph.resetView();
                    break;
                case 'f':
                    e.preventDefault();
                    document.getElementById('searchInput').focus();
                    break;
            }
        }
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function updateFilters() {
    const checkedTypes = Array.from(document.querySelectorAll('.filter-item input:checked'))
        .map(cb => cb.dataset.type);
    graph.filterByType(checkedTypes);
}

function loadSampleData(sample) {
    const data = SampleData[sample]();
    graph.setData(data.nodes, data.links);
    graph.fitView();
}

function importFromJSON() {
    const jsonText = document.getElementById('jsonInput').value.trim();
    if (!jsonText) {
        alert('Please enter JSON data');
        return;
    }
    
    try {
        const data = JSON.parse(jsonText);
        if (!data.nodes || !data.links) {
            throw new Error('Invalid format: must have "nodes" and "links" arrays');
        }
        graph.setData(data.nodes, data.links);
        graph.fitView();
        closeModal('importModal');
    } catch (error) {
        alert('Error parsing JSON: ' + error.message);
    }
}

async function importFromGitHub() {
    const url = document.getElementById('githubUrl').value.trim();
    if (!url) {
        alert('Please enter a GitHub URL');
        return;
    }
    
    // Parse GitHub URL
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        alert('Invalid GitHub URL format');
        return;
    }
    
    const [, owner, repo] = match;
    
    try {
        // Show loading state
        const btn = document.getElementById('analyzeGithub');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        btn.disabled = true;
        
        // Fetch repo contents from GitHub API
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`);
        if (!response.ok) {
            throw new Error('Failed to fetch repository. It may be private or not exist.');
        }
        
        const data = await response.json();
        
        // Convert to graph data
        const nodes = [];
        const links = [];
        const nodeMap = new Map();
        
        data.tree.forEach((item, index) => {
            if (item.type === 'blob' && item.path.match(/\.(js|ts|jsx|tsx|py|java|go|rs|cpp|c|h)$/)) {
                const id = `file-${index}`;
                const name = item.path.split('/').pop();
                const type = 'file';
                
                nodes.push({
                    id,
                    name,
                    type,
                    path: item.path,
                    size: 30
                });
                
                nodeMap.set(item.path, id);
                
                // Create folder structure links
                const parts = item.path.split('/');
                if (parts.length > 1) {
                    const parentPath = parts.slice(0, -1).join('/');
                    const parentId = nodeMap.get(parentPath);
                    if (parentId) {
                        links.push({
                            source: parentId,
                            target: id,
                            type: 'contains'
                        });
                    }
                }
            }
        });
        
        // Create some synthetic connections based on file names
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const name1 = nodes[i].name.toLowerCase();
                const name2 = nodes[j].name.toLowerCase();
                
                // If files have similar names, link them
                if (name1.replace(/\.(js|ts|jsx|tsx)$/, '') === 
                    name2.replace(/\.(test|spec)\.(js|ts|jsx|tsx)$/, '')) {
                    links.push({
                        source: nodes[i].id,
                        target: nodes[j].id,
                        type: 'related'
                    });
                }
            }
        }
        
        graph.setData(nodes, links);
        graph.fitView();
        closeModal('importModal');
        
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        const btn = document.getElementById('analyzeGithub');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Global function for node details update
window.updateNodeDetails = function(node, connectedIds, links) {
    const panel = document.getElementById('detailsPanel');
    const content = document.getElementById('detailsContent');
    
    panel.classList.remove('collapsed');
    
    // Find connected nodes details
    const connectedNodes = [];
    links.forEach(link => {
        const source = typeof link.source === 'object' ? link.source.id : link.source;
        const target = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (source === node.id) {
            const targetNode = graph.nodes.find(n => n.id === target);
            if (targetNode) {
                connectedNodes.push({node: targetNode, type: link.type, direction: 'outgoing'});
            }
        } else if (target === node.id) {
            const sourceNode = graph.nodes.find(n => n.id === source);
            if (sourceNode) {
                connectedNodes.push({node: sourceNode, type: link.type, direction: 'incoming'});
            }
        }
    });
    
    const typeColors = {
        file: '#4CAF50',
        function: '#2196F3',
        class: '#FF9800',
        import: '#9C27B0',
        export: '#E91E63',
        variable: '#00BCD4'
    };
    
    content.innerHTML = `
        <div class="node-detail-item">
            <label>Name</label>
            <div class="value" style="font-size: 18px; font-weight: 600;">${node.name}</div>
        </div>
        <div class="node-detail-item">
            <label>Type</label>
            <div class="value">
                <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <span class="color-dot" style="background: ${typeColors[node.type] || '#94a3b8'};"></span>
                    ${node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                </span>
            </div>
        </div>
        ${node.description ? `
        <div class="node-detail-item">
            <label>Description</label>
            <div class="value">${node.description}</div>
        </div>
        ` : ''}
        ${node.path ? `
        <div class="node-detail-item">
            <label>Path</label>
            <div class="value" style="font-family: monospace; font-size: 12px;">${node.path}</div>
        </div>
        ` : ''}
        <div class="node-detail-item">
            <label>ID</label>
            <div class="value" style="font-family: monospace; font-size: 12px; color: var(--text-muted);">${node.id}</div>
        </div>
        
        <div class="node-connections">
            <h4>Connections (${connectedNodes.length})</h4>
            <div class="connection-list">
                ${connectedNodes.map(conn => `
                    <div class="connection-item" onclick="highlightNode('${conn.node.id}')">
                        <i class="fas fa-${conn.direction === 'outgoing' ? 'arrow-right' : 'arrow-left'}"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 500;">${conn.node.name}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${conn.type} • ${conn.direction}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};

// Global function to highlight a node from details panel
window.highlightNode = function(nodeId) {
    const node = graph.nodes.find(n => n.id === nodeId);
    if (node) {
        graph.onNodeClick(node);
        graph.svg.transition()
            .duration(750)
            .call(graph.zoom.transform, d3.zoomIdentity
                .translate(graph.width / 2, graph.height / 2)
                .scale(1.5)
                .translate(-node.x, -node.y));
    }
};
