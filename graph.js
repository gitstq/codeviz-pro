/**
 * CodeGraph Explorer - Graph Visualization Engine
 * Uses D3.js for interactive force-directed and hierarchical graph layouts
 */

class GraphEngine {
    constructor(containerId) {
        this.container = d3.select(`#${containerId}`);
        this.width = this.container.node().clientWidth;
        this.height = this.container.node().clientHeight;
        
        this.nodes = [];
        this.links = [];
        this.simulation = null;
        this.svg = null;
        this.g = null;
        this.zoom = null;
        
        this.config = {
            nodeSize: 25,
            linkDistance: 100,
            chargeStrength: -300,
            showLabels: true,
            layout: 'force'
        };
        
        this.colors = {
            file: '#4CAF50',
            function: '#2196F3',
            class: '#FF9800',
            import: '#9C27B0',
            export: '#E91E63',
            variable: '#00BCD4'
        };
        
        this.selectedNode = null;
        this.highlightedNodes = new Set();
        
        this.init();
    }
    
    init() {
        // Clear container
        this.container.html('');
        
        // Create SVG
        this.svg = this.container.append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('viewBox', [0, 0, this.width, this.height]);
        
        // Add arrow markers for directed edges
        const defs = this.svg.append('defs');
        
        defs.append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 25)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#64748b');
        
        // Create main group for zoom
        this.g = this.svg.append('g');
        
        // Setup zoom
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });
        
        this.svg.call(this.zoom);
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        this.width = this.container.node().clientWidth;
        this.height = this.container.node().clientHeight;
        this.svg.attr('width', this.width).attr('height', this.height);
    }
    
    setData(nodes, links) {
        this.nodes = nodes.map(n => ({...n}));
        this.links = links.map(l => ({...l}));
        this.update();
    }
    
    update() {
        // Clear existing
        this.g.selectAll('*').remove();
        
        if (this.nodes.length === 0) return;
        
        switch (this.config.layout) {
            case 'force':
                this.renderForceLayout();
                break;
            case 'hierarchical':
                this.renderHierarchicalLayout();
                break;
            case 'circular':
                this.renderCircularLayout();
                break;
            case 'grid':
                this.renderGridLayout();
                break;
            default:
                this.renderForceLayout();
        }
        
        this.updateStats();
    }
    
    renderForceLayout() {
        // Create simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links).id(d => d.id).distance(this.config.linkDistance))
            .force('charge', d3.forceManyBody().strength(this.config.chargeStrength))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(this.config.nodeSize + 10));
        
        // Create links
        const link = this.g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.links)
            .join('line')
            .attr('class', 'link')
            .attr('stroke', '#64748b')
            .attr('stroke-width', d => d.type === 'import' ? 2 : 1)
            .attr('marker-end', d => d.type === 'import' ? 'url(#arrow)' : null);
        
        // Create nodes
        const node = this.g.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(this.nodes)
            .join('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d)));
        
        // Add circles
        node.append('circle')
            .attr('r', d => d.size || this.config.nodeSize)
            .attr('fill', d => this.colors[d.type] || '#94a3b8')
            .attr('stroke', '#1e293b')
            .attr('stroke-width', 2);
        
        // Add icons
        node.append('text')
            .attr('class', 'node-icon')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('font-family', 'FontAwesome')
            .attr('font-size', d => (d.size || this.config.nodeSize) * 0.5)
            .attr('fill', 'white')
            .attr('pointer-events', 'none')
            .text(d => this.getNodeIcon(d.type));
        
        // Add labels
        if (this.config.showLabels) {
            node.append('text')
                .attr('class', 'node-label')
                .attr('dx', d => (d.size || this.config.nodeSize) + 5)
                .attr('dy', '0.35em')
                .text(d => d.name);
        }
        
        // Add click handler
        node.on('click', (event, d) => this.onNodeClick(d));
        
        // Update positions on tick
        this.simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
            
            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });
    }
    
    renderHierarchicalLayout() {
        // Create hierarchy
        const root = this.createHierarchy();
        
        const treeLayout = d3.tree()
            .size([this.height - 100, this.width - 200]);
        
        treeLayout(root);
        
        // Position nodes
        root.descendants().forEach(d => {
            const node = this.nodes.find(n => n.id === d.data.id);
            if (node) {
                node.x = d.y + 100;
                node.y = d.x + 50;
            }
        });
        
        this.renderStaticLayout();
    }
    
    renderCircularLayout() {
        const radius = Math.min(this.width, this.height) / 2 - 100;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const angleStep = (2 * Math.PI) / this.nodes.length;
        
        this.nodes.forEach((node, i) => {
            const angle = i * angleStep;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        });
        
        this.renderStaticLayout();
    }
    
    renderGridLayout() {
        const cols = Math.ceil(Math.sqrt(this.nodes.length));
        const cellWidth = this.width / (cols + 1);
        const cellHeight = this.height / (cols + 1);
        
        this.nodes.forEach((node, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            node.x = (col + 1) * cellWidth;
            node.y = (row + 1) * cellHeight;
        });
        
        this.renderStaticLayout();
    }
    
    renderStaticLayout() {
        // Create links
        const link = this.g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.links)
            .join('line')
            .attr('class', 'link')
            .attr('stroke', '#64748b')
            .attr('stroke-width', d => d.type === 'import' ? 2 : 1)
            .attr('x1', d => this.nodes.find(n => n.id === d.source)?.x || 0)
            .attr('y1', d => this.nodes.find(n => n.id === d.source)?.y || 0)
            .attr('x2', d => this.nodes.find(n => n.id === d.target)?.x || 0)
            .attr('y2', d => this.nodes.find(n => n.id === d.target)?.y || 0);
        
        // Create nodes
        const node = this.g.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(this.nodes)
            .join('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d)));
        
        // Add circles
        node.append('circle')
            .attr('r', d => d.size || this.config.nodeSize)
            .attr('fill', d => this.colors[d.type] || '#94a3b8')
            .attr('stroke', '#1e293b')
            .attr('stroke-width', 2);
        
        // Add icons
        node.append('text')
            .attr('class', 'node-icon')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('font-family', 'FontAwesome')
            .attr('font-size', d => (d.size || this.config.nodeSize) * 0.5)
            .attr('fill', 'white')
            .attr('pointer-events', 'none')
            .text(d => this.getNodeIcon(d.type));
        
        // Add labels
        if (this.config.showLabels) {
            node.append('text')
                .attr('class', 'node-label')
                .attr('dx', d => (d.size || this.config.nodeSize) + 5)
                .attr('dy', '0.35em')
                .text(d => d.name);
        }
        
        // Add click handler
        node.on('click', (event, d) => this.onNodeClick(d));
    }
    
    createHierarchy() {
        // Build hierarchy from links
        const childrenMap = new Map();
        const parentMap = new Map();
        
        this.links.forEach(link => {
            const source = typeof link.source === 'object' ? link.source.id : link.source;
            const target = typeof link.target === 'object' ? link.target.id : link.target;
            
            if (!childrenMap.has(source)) childrenMap.set(source, []);
            childrenMap.get(source).push(target);
            parentMap.set(target, source);
        });
        
        // Find root (node with no parent)
        let rootId = this.nodes[0]?.id;
        for (const node of this.nodes) {
            if (!parentMap.has(node.id)) {
                rootId = node.id;
                break;
            }
        }
        
        const buildTree = (id) => {
            const node = this.nodes.find(n => n.id === id);
            const children = childrenMap.get(id) || [];
            return {
                ...node,
                children: children.map(buildTree)
            };
        };
        
        return d3.hierarchy(buildTree(rootId));
    }
    
    getNodeIcon(type) {
        const icons = {
            file: '\uf15b',
            function: '\uf013',
            class: '\uf0e8',
            import: '\uf063',
            export: '\uf0aa',
            variable: '\uf292'
        };
        return icons[type] || '\uf111';
    }
    
    dragstarted(event, d) {
        if (this.simulation) {
            if (!event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
        if (!this.simulation) {
            d.x = event.x;
            d.y = event.y;
            this.update();
        }
    }
    
    dragended(event, d) {
        if (this.simulation) {
            if (!event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }
    
    onNodeClick(d) {
        this.selectedNode = d;
        
        // Update visual state
        this.g.selectAll('.node').classed('selected', n => n.id === d.id);
        
        // Find connected nodes
        const connected = new Set();
        this.links.forEach(link => {
            const source = typeof link.source === 'object' ? link.source.id : link.source;
            const target = typeof link.target === 'object' ? link.target.id : link.target;
            if (source === d.id) connected.add(target);
            if (target === d.id) connected.add(source);
        });
        
        // Update UI
        if (window.updateNodeDetails) {
            window.updateNodeDetails(d, connected, this.links);
        }
    }
    
    highlightNodes(nodeIds) {
        this.highlightedNodes = new Set(nodeIds);
        this.g.selectAll('.node')
            .classed('highlighted', d => this.highlightedNodes.has(d.id))
            .classed('dimmed', d => !this.highlightedNodes.has(d.id) && this.highlightedNodes.size > 0);
        
        this.g.selectAll('.link')
            .classed('dimmed', d => {
                const source = typeof d.source === 'object' ? d.source.id : d.source;
                const target = typeof d.target === 'object' ? d.target.id : d.target;
                return !(this.highlightedNodes.has(source) && this.highlightedNodes.has(target));
            });
    }
    
    clearHighlight() {
        this.highlightedNodes.clear();
        this.g.selectAll('.node').classed('highlighted', false).classed('dimmed', false);
        this.g.selectAll('.link').classed('dimmed', false);
    }
    
    setLayout(layout) {
        this.config.layout = layout;
        this.update();
    }
    
    setConfig(key, value) {
        this.config[key] = value;
        if (key === 'nodeSize' || key === 'linkDistance' || key === 'chargeStrength') {
            this.update();
        } else if (key === 'showLabels') {
            this.update();
        }
    }
    
    zoomIn() {
        this.svg.transition().call(this.zoom.scaleBy, 1.3);
    }
    
    zoomOut() {
        this.svg.transition().call(this.zoom.scaleBy, 0.7);
    }
    
    fitView() {
        if (this.nodes.length === 0) return;
        
        const bounds = this.g.node().getBBox();
        const fullWidth = this.width;
        const fullHeight = this.height;
        const width = bounds.width;
        const height = bounds.height;
        const midX = bounds.x + width / 2;
        const midY = bounds.y + height / 2;
        
        if (width === 0 || height === 0) return;
        
        const scale = Math.min(fullWidth / width, fullHeight / height) * 0.8;
        const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
        
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    }
    
    resetView() {
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
    }
    
    searchNodes(query) {
        if (!query) {
            this.clearHighlight();
            return;
        }
        
        const matches = this.nodes.filter(n => 
            n.name.toLowerCase().includes(query.toLowerCase()) ||
            (n.description && n.description.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.highlightNodes(matches.map(n => n.id));
        
        if (matches.length > 0) {
            const firstMatch = matches[0];
            this.svg.transition()
                .duration(750)
                .call(this.zoom.transform, d3.zoomIdentity
                    .translate(this.width / 2, this.height / 2)
                    .scale(1.5)
                    .translate(-firstMatch.x, -firstMatch.y));
        }
    }
    
    filterByType(types) {
        const typeSet = new Set(types);
        this.g.selectAll('.node')
            .style('display', d => typeSet.has(d.type) ? null : 'none');
        this.g.selectAll('.link')
            .style('display', d => {
                const source = typeof d.source === 'object' ? d.source : this.nodes.find(n => n.id === d.source);
                const target = typeof d.target === 'object' ? d.target : this.nodes.find(n => n.id === d.target);
                return (typeSet.has(source?.type) && typeSet.has(target?.type)) ? null : 'none';
            });
    }
    
    updateStats() {
        const nodeCount = this.nodes.length;
        const linkCount = this.links.length;
        
        // Count connected components
        const visited = new Set();
        let components = 0;
        
        const dfs = (nodeId) => {
            visited.add(nodeId);
            this.links.forEach(link => {
                const source = typeof link.source === 'object' ? link.source.id : link.source;
                const target = typeof link.target === 'object' ? link.target.id : link.target;
                if (source === nodeId && !visited.has(target)) dfs(target);
                if (target === nodeId && !visited.has(source)) dfs(source);
            });
        };
        
        this.nodes.forEach(node => {
            if (!visited.has(node.id)) {
                components++;
                dfs(node.id);
            }
        });
        
        document.getElementById('nodeCount').textContent = nodeCount;
        document.getElementById('linkCount').textContent = linkCount;
        document.getElementById('componentCount').textContent = components;
    }
    
    exportToPNG() {
        const svgNode = this.svg.node();
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgNode);
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
            canvas.width = this.width;
            canvas.height = this.height;
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'codegraph.png';
            downloadLink.click();
            
            URL.revokeObjectURL(url);
        };
        
        img.src = url;
    }
    
    exportToSVG() {
        const svgNode = this.svg.node();
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgNode);
        
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'codegraph.svg';
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    }
    
    exportToJSON() {
        const data = {
            nodes: this.nodes.map(n => ({
                id: n.id,
                name: n.name,
                type: n.type,
                description: n.description,
                size: n.size
            })),
            links: this.links.map(l => ({
                source: typeof l.source === 'object' ? l.source.id : l.source,
                target: typeof l.target === 'object' ? l.target.id : l.target,
                type: l.type
            }))
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'codegraph.json';
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    }
}

// Sample data generators
const SampleData = {
    simple() {
        return {
            nodes: [
                {id: '1', name: 'main.js', type: 'file', description: 'Entry point'},
                {id: '2', name: 'utils.js', type: 'file', description: 'Utility functions'},
                {id: '3', name: 'formatDate', type: 'function', description: 'Format date string'},
                {id: '4', name: 'parseJSON', type: 'function', description: 'Parse JSON safely'},
                {id: '5', name: 'config.js', type: 'file', description: 'Configuration'},
                {id: '6', name: 'API_KEY', type: 'variable', description: 'API key constant'}
            ],
            links: [
                {source: '1', target: '2', type: 'import'},
                {source: '2', target: '3', type: 'export'},
                {source: '2', target: '4', type: 'export'},
                {source: '1', target: '5', type: 'import'},
                {source: '5', target: '6', type: 'contains'}
            ]
        };
    },
    
    complex() {
        const nodes = [];
        const links = [];
        
        // Create a complex project structure
        const files = ['app.js', 'router.js', 'auth.js', 'user.js', 'post.js', 'db.js', 'utils.js', 'config.js'];
        const classes = ['UserController', 'PostController', 'AuthService', 'Database'];
        const functions = ['login', 'register', 'createPost', 'getPosts', 'validateToken', 'hashPassword', 'connectDB'];
        
        files.forEach((f, i) => {
            nodes.push({id: `file-${i}`, name: f, type: 'file', size: 30});
        });
        
        classes.forEach((c, i) => {
            nodes.push({id: `class-${i}`, name: c, type: 'class', size: 35});
        });
        
        functions.forEach((f, i) => {
            nodes.push({id: `func-${i}`, name: f, type: 'function', size: 25});
        });
        
        // Create connections
        links.push(
            {source: 'file-0', target: 'file-1', type: 'import'},
            {source: 'file-0', target: 'file-2', type: 'import'},
            {source: 'file-0', target: 'file-5', type: 'import'},
            {source: 'file-2', target: 'class-2', type: 'contains'},
            {source: 'file-3', target: 'class-0', type: 'contains'},
            {source: 'file-4', target: 'class-1', type: 'contains'},
            {source: 'file-5', target: 'class-3', type: 'contains'},
            {source: 'class-0', target: 'func-2', type: 'contains'},
            {source: 'class-0', target: 'func-3', type: 'contains'},
            {source: 'class-1', target: 'func-2', type: 'contains'},
            {source: 'class-2', target: 'func-0', type: 'contains'},
            {source: 'class-2', target: 'func-1', type: 'contains'},
            {source: 'class-2', target: 'func-4', type: 'contains'},
            {source: 'class-3', target: 'func-6', type: 'contains'},
            {source: 'func-0', target: 'func-4', type: 'calls'},
            {source: 'func-1', target: 'func-5', type: 'calls'},
            {source: 'func-2', target: 'func-6', type: 'calls'}
        );
        
        return {nodes, links};
    },
    
    tree() {
        const nodes = [];
        const links = [];
        
        // Create tree structure
        const createTree = (parentId, depth, maxDepth, index) => {
            if (depth >= maxDepth) return;
            
            const numChildren = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numChildren; i++) {
                const id = `${parentId}-${i}`;
                const types = ['file', 'function', 'class'];
                const type = types[Math.floor(Math.random() * types.length)];
                nodes.push({id, name: `Node ${id}`, type, size: 25 - depth * 3});
                links.push({source: parentId, target: id, type: 'contains'});
                createTree(id, depth + 1, maxDepth, i);
            }
        };
        
        nodes.push({id: 'root', name: 'Root', type: 'file', size: 40});
        createTree('root', 0, 4, 0);
        
        return {nodes, links};
    }
};
