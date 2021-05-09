import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { TSCustomNodeModel } from './TSCustomNodeModel';
import { PortModel, PortModelGenerics } from '@projectstorm/react-diagrams';

export interface TSCustomNodeWidgetProps {
	node: TSCustomNodeModel;
	engine: DiagramEngine;
}

export interface TSCustomNodeWidgetState {}

export class TSCustomNodeWidget extends React.Component<TSCustomNodeWidgetProps, TSCustomNodeWidgetState> {
	constructor(props: TSCustomNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		console.log('custom node widget')
		return (
			<div className="CustomNode">
				<div className="CustomNode-name">{this.props.node.name}</div>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('in') as PortModel<PortModelGenerics>}>
					<div className="port-container">
						<div className="circle-port" /> in
					</div>
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out') as PortModel<PortModelGenerics>}>
					<div className="port-container">
						<div className="circle-port" /> out
					</div>
				</PortWidget>
				<div className="CustomNode-color" style={{ backgroundColor: this.props.node.color }} />
			</div>
		);
	}
}
