import { JsonAsset } from 'cc';
import { ConfigLoadHandlerBase, ConfigLoadHandlerContext } from 'lite-ts-config';

import { AssetLoaderBase } from './loader-base';

export class AssetConfigLoadHandler extends ConfigLoadHandlerBase {
    public constructor(
        private m_AssetLoader: AssetLoaderBase,
        private m_NameOfPath: { [key: string]: string; },
    ) {
        super();
    }

    public async handle(ctx: ConfigLoadHandlerContext) {
        if (this.m_NameOfPath[ctx.name]) {
            const asset = await this.m_AssetLoader.load<JsonAsset>(JsonAsset, this.m_NameOfPath[ctx.name]);
            ctx.res = asset.json;
        } else {
            await this.next?.handle(ctx);
        }
    }
}