import { Layout, Graph, Edge, Node } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';

export class RadialLayout implements Layout {

  constructor(private centerX: number, private centerY: number) {}

  run(graph: Graph): Graph {
    const centerX = this.centerX;
    const centerY = this.centerY;
    const radius = Math.max(200, graph.nodes.length * 20);

    // Step 1: Find root node (not targeted by any edge)
    const root = graph.nodes.find(
      (n) => !graph.edges.some((e) => e.target === n.id)
    );
    if (!root) return graph;

    // Step 2: Separate root and children
    const children = graph.nodes.filter((n) => n.id !== root.id);
    const angleStep = (2 * Math.PI) / Math.max(children.length, 1);

    const lineFn = shape
      .line<any>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(shape.curveLinear);

    // Step 3: Position all nodes
    const positionedNodes: Node[] = graph.nodes.map((node) => {
      if (node.id === root.id) {
        return {
          ...node,
          position: { x: centerX, y: centerY },
          dimension: node.dimension || { width: 100, height: 100 },
          transform: `translate(${centerX - 50}, ${centerY - 50})`,
        };
      }

      const angle = children.findIndex((n) => n.id === node.id) * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        ...node,
        position: { x, y },
        dimension: node.dimension || { width: 100, height: 100 },
        transform: `translate(${x - 50}, ${y - 50})`,
      };
    });

    // Step 4: Create new edges with points and midpoints
    const positionedEdges: Edge[] = graph.edges.map((edge) => {
      const sourceNode = positionedNodes.find((n) => n.id === edge.source);
      const targetNode = positionedNodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return edge;

      const p1 = sourceNode.position!;
      const p2 = targetNode.position!;
      const points = [p1, p2];

      return {
        ...edge,
        id: edge.id || `${edge.source}-${edge.target}`,
        points,
        midPoint: {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
        },
        line: lineFn(points) || undefined,
        textPath: lineFn(points) || undefined,
      };
    });

    // Step 5: Return the final graph
    return {
      ...graph,
      nodes: positionedNodes,
      edges: positionedEdges,
      edgeLabels: positionedEdges
    };
  }

  updateEdge(graph: Graph, edge: Edge): Graph {
    // Optional if dynamic edge updates are used
    return graph;
  }
}
