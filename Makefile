include Makefile.helpers
include Makefile.secret
modname = ehaugw-mk17-gen-3
dependencies =

unity-from:
	cp /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/AssetBundles/StandaloneWindows/scar_h_gen_3_upper.bundle bundles/SCAR_H_GEN_3/
	cp /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/AssetBundles/StandaloneWindows/scar_h_gen_3_lower.bundle bundles/SCAR_H_GEN_3/

unity-to:
	cp -r /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/Mk17Gen3/Textures/Gen3Upper/* /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/Assets/Ehaugw/Attachments/Mk17Gen3/Rail/Textures/scar_h_gen_3_upper
	cp -r /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/Mk17Gen3/Textures/Gen3Lower/* /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/Assets/Ehaugw/Attachments/Mk17Gen3/Rail/Textures/scar_h_gen3_lower

server-to:


assemble: unity-from
	rm -f -r export
	mkdir -p export/$(tspath)/$(modname)
	mkdir -p export/$(tspath)/$(modname)/src
	cp -r bundles export/$(tspath)/$(modname)/bundles
	cp src/mod.ts export/$(tspath)/$(modname)/src
	cp package.json export/$(tspath)/$(modname)/
	cp bundles.json export/$(tspath)/$(modname)/
	cp README.md export/$(tspath)/$(modname)/
	cp icon.png export/$(tspath)/$(modname)/

forceinstall:
	make assemble
	rm -r -f $(gamepath)/$(pluginpath)/$(modname)
	cp -u -r export/* $(gamepath)
	scp -r export/* $(hostwanuser):SPT_3_11/server_files

play:
	(make install && cd .. && make play)
