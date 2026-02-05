import { DependencyContainer } from "tsyringe";

import { ILogger } from "@spt/models/spt/utils/ILogger";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";

// GENERICS
const genericReceiver = "55818a304bdc2db5418b457d";
const roubles = "5449016a4bdc2d6f028b456f";
const genericMount = "55818b224bdc2dde698b456f";

// NEW CONTENT
const scarHUpperGen3FDE = "6978c12f547952b888405528"
const scarHIrsGen3FDE = "697b97ea048ba4bb3334697f";

// RAILS
const scarHMrexFDE = "66ffc6ceb7ff397142017c3a";

// RECEIVERS
const scarHUpperFDE = "6165aeedfaa1272e431521e3"

// SIGHTS
const scarSightFront = "61816fcad92c473c770215cc";

// GUNS
const scarHFDE = "6165ac306ef05c2ce828ef74";
const scarH = "6183afd850224f204c1da514";
const x17 = "676176d362e0497044079f4c";
const scarL = "6184055050224f204c1da540";
const scarLFDE = "618428466ef05c2ce828f218";

// TRADES
const tradeScarHUpperGen3FDE = "6979fbfe3121edb6d765bb05";
const tradeScarHIrsGen3FDE = "697b9885bbd5615d7c8a6742";

// TRADERS
const therapist = "54cb57776803fa99248b456e";
const mechanic = "5a7c2eca46aef81a7ca2145d";
const peacekeeper = "5935c25fb3acc3127c3d8cd9";
//
// MAGAZINES
const scarHMag = "618168dc8004cc50514c34fc";
const scarHMagFDE = "6183d53f1cb55961fa0fdcda";
const ar10Lancer = "65293c38fc460e50a509cb25";

// RAILS
const scarPMMRail = "66ffc72082d36dec82030c1f";
const scarPMMRailFDE = "66ffc903fe9b382596065304";
const scarPMMRailExtension = "66ffe2fbab3336cc0106382b";
const scarPMMRailExtensionFDE = "66ffe5edfe9b38259606530d";
const scarBottomRail = "61816df1d3a39d50044c139e";
const scarPwsSrxRailExtension = "61965d9058ef8c428c287e0d";
const scarVltorCasv = "66ffe811f5d758d71101e89a";
const scarVltorCasvFDE = "66ffea06132225f0fe061394";
const scarMrex = "619666f4af1f5202c57a952d";
const scarMrexFDE = "66ffc6ceb7ff397142017c3a";
const scarVltorCasvExtension = "66ffea456be19fd81e0ef742";
const scarVltorCasvExtensionFDE = "66ffeab4ab3336cc01063833";

class Mod implements IPostDBLoadMod
{    
    tables: IDatabaseTables;

    public postDBLoad(container: DependencyContainer): void
    {
        // const logger = container.resolve<ILogger>("WinstonLogger");

        // get database from the server
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.tables = databaseServer.getTables();

        const ergo_budget = this.nerfX17();
        this.createScarGen3Upper(customItem);
        this.createScarGen3Lower(customItem, ergo_budget);
    }

    public nerfX17(): number {
        // 2 Ergo nerf to X17
        // Early game buff
        const nerf_from_mag = this.getErgo(ar10Lancer) - this.getErgo(scarHMag);
        this.moveErgo(
            [scarPMMRailExtension, scarPMMRailExtensionFDE, scarPwsSrxRailExtension, scarMrex, scarMrexFDE, scarVltorCasv, scarVltorCasvFDE],
            [scarHMag, scarHMagFDE],
            nerf_from_mag,
        );

        // 2 Ergo nerf to X17
        // Early game buff
        const nerf_from_lower = this.getErgo(x17) - this.getErgo(scarH);
        this.moveErgo(
            [scarPMMRailExtension, scarPMMRailExtensionFDE, scarPwsSrxRailExtension, scarMrex, scarMrexFDE, scarVltorCasvExtension, scarVltorCasvExtensionFDE],
            [scarH, scarHFDE, scarL, scarLFDE],
            nerf_from_lower,
        );
        return nerf_from_mag + nerf_from_lower;
    }

    public createScarGen3Upper(customItem): void {
        // CREATE ITEM
        const gen_3_upper_creator: NewItemFromCloneDetails = {
            itemTplToClone: scarHUpperFDE,
            overrideProperties: {
                Name: "SCAR-H Gen 3 upper receiver (FDE)",
                ShortName: "Mk17 Gen3",
                Description: "A third generation upper receiver for the SCAR-H assault rifle, manufactured by Fabrique Nationale Herstal. Features a top rail for installation of additional equipment. Comes in black and flat dark earth.",
                Prefab: {
                    "path": "SCAR_H_GEN_3/scar_h_gen_3_upper.bundle",
                    "rcid": ""
                },
            },
            parentId: genericReceiver,
            newId: scarHUpperGen3FDE,
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 12500,
            handbookParentId: "5b5f764186f77447ec5d7714",
            locales: {
                en: {
                name: "SCAR-H Gen 3 upper receiver (FDE)",
                shortName: "Mk17 Gen3",
                description: "A third generation upper receiver for the SCAR-H assault rifle, manufactured by Fabrique Nationale Herstal. Features a top rail for installation of additional equipment. Comes in black and flat dark earth.",
                }
            }
        };
        customItem.createItemFromClone(gen_3_upper_creator);

        // MAKE ELIGIBLE FOR SCAR
        [scarH, scarHFDE, x17].forEach((value: string) => {
            this.tables.templates.items[value]._props.Slots[2]._props.filters[0].Filter.push(scarHUpperGen3FDE);
        });

        this.addErgo(scarHUpperGen3FDE, this.getErgo(scarVltorCasv) + this.getErgo(scarVltorCasvExtension));
        this.addRecoil(scarHUpperGen3FDE, this.getRecoil(scarVltorCasv) + this.getRecoil(scarVltorCasvExtension));
        this.setWeight(scarHUpperGen3FDE, 0.325)

        // TRADER STUFF
        const traders = this.tables.traders[peacekeeper];
        traders.assort.items.push({
            "_id": tradeScarHUpperGen3FDE,
            "_tpl": scarHUpperGen3FDE,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
            {
                "UnlimitedCount": true,
                "StackObjectsCount": 99999
            }
        });
        traders.assort.barter_scheme[tradeScarHUpperGen3FDE] = [
            [
                {
                    "count": 89,
                    "_tpl": roubles
                }
            ]
        ];
        traders.assort.loyal_level_items[tradeScarHUpperGen3FDE] = 4;
    }

    public createScarGen3Lower(customItem, ergo_budget: number): void {
        // CREATE ITEM
        const item_creator: NewItemFromCloneDetails = {
            itemTplToClone: scarHMrexFDE,
            overrideProperties: {
                Name: "SCAR-H Gen 3 IRS (FDE)",
                ShortName: "Mk17 Gen3",
                Description: "A third generation integrated rail system, manufactured by Fabrique Nationale Herstal.",
                Prefab: {
                    "path": "SCAR_H_GEN_3/scar_h_gen_3_lower.bundle",
                    "rcid": ""
                },
            },
            parentId: genericMount,
            newId: scarHIrsGen3FDE,
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 7500,
            handbookParentId: "5b5f755f86f77447ec5d770e",
            locales: {
                en: {
                name: "SCAR-H Gen 3 IRS (FDE)",
                shortName: "Mk17 Gen3",
                description: "A third generation integrated rail system, manufactured by Fabrique Nationale Herstal.",
                }
            }
        };
        customItem.createItemFromClone(item_creator);

        // MAKE ELIGIBLE FOR SCAR
        [scarHUpperGen3FDE].forEach((value: string) => {
            this.tables.templates.items[value]._props.Slots[5]._props.filters[0].Filter = [scarHIrsGen3FDE];
        });
        this.tables.templates.items[scarHUpperGen3FDE]._props.ConflictingItems.push(scarSightFront);

        // 4 is from the X17 nerf in Weapon Balancing
        this.setErgo(scarHIrsGen3FDE, ergo_budget);
        this.setRecoil(scarHIrsGen3FDE, 0);
        this.setWeight(scarHUpperGen3FDE, 0.175)

        // TRADER STUFF
        const traders = this.tables.traders[peacekeeper];
        traders.assort.items.push({
            "_id": tradeScarHIrsGen3FDE,
            "_tpl": scarHIrsGen3FDE,
            "parentId": "hideout",
            "slotId": "hideout",
            "upd":
            {
                "UnlimitedCount": true,
                "StackObjectsCount": 99999
            }
        });
        traders.assort.barter_scheme[tradeScarHIrsGen3FDE] = [
            [
                {
                    "count": 54,
                    "_tpl": roubles
                }
            ]
        ];
        traders.assort.loyal_level_items[tradeScarHIrsGen3FDE] = 4;
    }

    public moveRecoil(from_list: string[], to_list: string[], value: number): void {
        to_list.forEach((item) => {
            this.addRecoil(item, -value);
        });
        from_list.forEach((item) => {
            this.addRecoil(item, -value);
        });
    }
    public moveErgo(from_list: string[], to_list: string[], value: number): void {
        to_list.forEach((item) => {
            this.addErgo(item, -value);
        });
        from_list.forEach((item) => {
            this.addErgo(item, -value);
        });
    }

    public setRecoil(item, value): void {
        this.tables.templates.items[item]._props.Recoil = value;
    }

    public getRecoil(item) {
        return this.tables.templates.items[item]._props.Recoil;
    }

    public addRecoil(item, value): void {

        this.setRecoil(item, this.getRecoil(item) + value)
    }

    public setErgo(item, value): void {
        this.tables.templates.items[item]._props.Ergonomics = value;
    }

    public getErgo(item) {
        return this.tables.templates.items[item]._props.Ergonomics;
    }

    public addErgo(item, value): void {
        this.setErgo(item, this.getErgo(item) + value)
    }

    public setWeight(item, value): void {
        this.tables.templates.items[item]._props.Weight = value;
    }
}

export const mod = new Mod();
