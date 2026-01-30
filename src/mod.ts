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

class Mod implements IPostDBLoadMod
{    
    public postDBLoad(container: DependencyContainer): void
    {
        // const logger = container.resolve<ILogger>("WinstonLogger");

        // get database from the server
        const customItem = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables: IDatabaseTables = databaseServer.getTables();

        this.createScarGen3Upper(customItem, tables);
        this.createScarGen3Lower(customItem, tables);
    }

    public createScarGen3Upper(customItem, tables): void {
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
        [scarH, scarHFDE, x17].forEach(function (value: string) {
            tables.templates.items[value]._props.Slots[2]._props.filters[0].Filter.push(scarHUpperGen3FDE);
        });

        this.addErgo(tables, scarHUpperGen3FDE, -1)
        this.addRecoil(tables, scarHUpperGen3FDE, -4)
        this.setWeight(tables, scarHUpperGen3FDE, 0.325)


        // TRADER STUFF
        const traders = tables.traders[peacekeeper];
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

    public createScarGen3Lower(customItem, tables): void {
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
        [scarHUpperGen3FDE].forEach(function (value: string) {
            tables.templates.items[value]._props.Slots[5]._props.filters[0].Filter = [scarHIrsGen3FDE];
        });
        tables.templates.items[scarHUpperGen3FDE]._props.ConflictingItems.push(scarSightFront);


        this.setErgo(tables, scarHIrsGen3FDE, 2)
        this.setRecoil(tables, scarHIrsGen3FDE, 0)
        this.setWeight(tables, scarHUpperGen3FDE, 0.175)

        // TRADER STUFF
        const traders = tables.traders[peacekeeper];
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

    public setRecoil(tables, item, value): void {
        tables.templates.items[item]._props.Recoil = value;
    }

    public getRecoil(tables, item) {
        return tables.templates.items[item]._props.Recoil;
    }

    public addRecoil(tables, item, value): void {

        this.setRecoil(tables, item, this.getRecoil(tables, item) + value)
    }

    public setErgo(tables, item, value): void {
        tables.templates.items[item]._props.Ergonomics = value;
    }

    public getErgo(tables, item) {
        return tables.templates.items[item]._props.Ergonomics;
    }

    public addErgo(tables, item, value): void {
        this.setErgo(tables, item, this.getErgo(tables, item) + value)
    }

    public setWeight(tables, item, value): void {
        tables.templates.items[item]._props.Weight = value;
    }
}

export const mod = new Mod();
