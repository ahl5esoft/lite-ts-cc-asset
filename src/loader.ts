import { Asset, assetManager, path, resources, SpriteFrame } from 'cc';

import { AssetLoaderBase } from './loader-base';

export class AssetLoader extends AssetLoaderBase {
    public constructor(
        private m_LoadedAsset: { [path: string]: Asset; },
    ) {
        super();
    }

    public async load<T extends Asset>(typer: new () => T, pathString: string) {
        if (this.m_LoadedAsset[pathString])
            return this.m_LoadedAsset[pathString] as T;

        const ext = path.extname(pathString);
        pathString = pathString.replace(ext, '');
        if (typer == SpriteFrame as any)
            pathString += '/spriteFrame';

        return new Promise<T>((s, f) => {
            const parts = pathString.split(':');
            if (parts.length == 1) {
                resources.load<T>(pathString, typer, (err, res) => {
                    if (err)
                        return f(err);

                    s(res);
                });
            } else {
                assetManager.loadBundle(parts[0], (err, res) => {
                    if (err)
                        return f(err);

                    res.load<T>(parts[1], typer, (cErr, cRes) => {
                        if (cErr)
                            return f(cErr);

                        s(cRes);
                    });
                });
            }
        });
    }
}