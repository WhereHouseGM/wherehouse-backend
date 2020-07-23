import WarehouseModel from '@models/warehouse.model';
import WarehouseLocationModel from '@models/warehouse-location.model';
import WarehouseAttachmentModel from '@models/warehouse-attachment.model';
import { NotFoundError } from '@errors/not-found-error';
import { Op } from "sequelize";

interface Location {
    latitude: number;
    longitude: number;
}

interface SimplifiedWarehouse {
    id: number;
    name: string;
    thumbnailUrl?: string;
    address: string;
    addressDetail: string;
    size: number;
    canUse: boolean;
    location: Location
}

export async function getWarehouses(option: any): Promise<SimplifiedWarehouse[]> {
    let queryOptions;
    const limit = parseInt(option.limit);
    const offset = parseInt(option.offset);

    if(isPaged(option) && isSearch(option))
        queryOptions = { limit, offset, where: { address: { [Op.like]: `%${option.address}%` } } };
    else if(!isPaged(option) && isSearch(option))
        queryOptions = { where: { address: { [Op.like]: `%${option.address}%` } } };
    else if(isPaged(option) && !isSearch(option))
        queryOptions = { limit, offset };
    else if(!isPaged(option) && !isSearch(option))
        queryOptions = {};

    const warehouses = await WarehouseModel.findAll(queryOptions);
    const warehouseInfos: SimplifiedWarehouse[] = [];
    for (const warehouse of warehouses) {
        const location = await WarehouseLocationModel.findOne({ where: { warehouseId: warehouse.id } });
        const image = await WarehouseAttachmentModel.findOne({ where: { warehouseId: warehouse.id } });

        if(location == null) throw new NotFoundError();

        warehouseInfos.push({
            id: warehouse.id,
            name: warehouse.name,
            thumbnailUrl: image?.url,
            address: warehouse.address,
            addressDetail: warehouse.addressDetail,
            size: warehouse.size,
            canUse: warehouse.canUse,
            location: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
    }

    return warehouseInfos;
}

function isPaged(option): boolean {
    return option.limit !== undefined && option.offset !== undefined;
}

function isSearch(option): boolean {
    return option.address !== undefined;
}