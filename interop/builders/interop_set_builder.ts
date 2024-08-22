import { AstNodeBuilder } from './ast_node_builder.ts';

export class InteropSetBuidler {
	bindingName?: string;
	bindingValue?: AstNodeBuilder;
	comment?: string;

	withBindingName(bindingName: string) {
		this.bindingName = bindingName;
		return this;
	}

	withBindingValue(bindingValue: AstNodeBuilder) {
		this.bindingValue = bindingValue;
		return this;
	}

	withComment(comment: string) {
		this.comment = comment;
		return this;
	}

	build() {
		if (!this.bindingName || !this.bindingValue) {
			throw new TypeError('withBindingName and withBindingValue are required.');
		}

		const comment = this.comment ? `// ${this.comment}` : '';
		return `${comment}
            interop.set(
                new types.SymbolNode("${this.bindingName}"), 
                ${this.bindingValue.build()}
            );
        `;
	}
}
