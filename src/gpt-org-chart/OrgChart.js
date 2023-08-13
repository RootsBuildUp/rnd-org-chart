import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './OrgChart.css';

const orgChartData = {
    id: 1,
    name: 'CEO',
    children: [
        {
            id: 2,
            name: 'Manager A',
            children: [
                {
                    id: 5,
                    name: 'Employee A1',
                    parents: [{ id: 2, name: 'Manager A' }],
                },
                {
                    id: 6,
                    name: 'Employee A2',
                    parents: [{ id: 2, name: 'Manager A' }],
                },
            ],
        },
        {
            id: 3,
            name: 'Manager B',
            children: [
                {
                    id: 7,
                    name: 'Employee B1',
                    parents: [{ id: 3, name: 'Manager B' }],
                },
            ],
        },
        {
            id: 4,
            name: 'Manager C',
            children: [
                {
                    id: 8,
                    name: 'Employee C1',
                    parents: [{ id: 4, name: 'Manager C' }],
                },
                {
                    id: 9,
                    name: 'Employee C2',
                    parents: [{ id: 4, name: 'Manager C' }],
                },
            ],
        },
    ],
};
const OrgChart = () => {
    let data = orgChartData;
    const svgRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 600;

        const treeLayout = d3.tree().size([height, width - 200]);

        const root = d3.hierarchy(data);
        treeLayout(root);

        const linkGenerator = d3
            .linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        const nodes = root.descendants();
        const links = root.links();

        // Create nodes
        const nodeSelection = svg
            .selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`);

        nodeSelection.append('circle').attr('r', 10);

        nodeSelection
            .append('text')
            .attr('dy', 5)
            .attr('x', d => (d.children ? -15 : 15))
            .style('text-anchor', d => (d.children ? 'end' : 'start'))
            .text(d => d.data.name);

        // Create links
        svg
            .selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGenerator);

        // Adjust node positions for multiple parents
        nodeSelection.attr('transform', d => {
            if (d.data.parents) {
                const xPositions = d.data.parents.map(parent => parent.x);
                const yPosition = d3.mean(xPositions);
                return `translate(${yPosition},${d.x})`;
            }
            return `translate(${d.y},${d.x})`;
        });
    }, [data]);

    return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default OrgChart;
