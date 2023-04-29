import { Asset } from 'cc';

export abstract class AssetLoaderBase {
    public static ctor = 'AssetLoaderBase';

    public abstract load<T extends Asset>(typer: new () => T, path: string): Promise<T>;
}