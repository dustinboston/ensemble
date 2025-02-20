# TODO: Create scripts for building and packaging the extensions
# # Install syntax and snippets extensions
# install: package
# 	cd $(EXTENSION_DIR) && npm install
# 	code --install-extension $(EXTENSION_DIR)/ensemble-syntax-$(EXTENSION_VERSION).vsix

# # Package syntax and snippets extensions
# package:
# 	cd $(EXTENSION_DIR) && $(NODE) $(VSCE) package
