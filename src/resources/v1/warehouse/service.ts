import WarehouseModel from '@models/warehouse.model';
import WarehouseLocationModel from '@models/warehouse-location.model';
import WarehouseAttachmentModel from '@models/warehouse-attachment.model';
import { NotFoundError } from '@errors/not-found-error';

interface Location {
    latitude: number;
    longitude: number;
}

interface SimplifiedWarehouse {
    id: number;
    name: string;
    thumbnailUrl?: string;
    size: number;
    canUse: boolean;
    location: Location
}
export async function getWarehouses(option: any): Promise<SimplifiedWarehouse[]> {
    let queryOptions;
    console.log(option);
    if(isPaged(option) && isSearch(option))
        queryOptions = { limit: option.limit, offset: option.offset, where: { address: option.address } };
    else if(!isPaged(option) && isSearch(option))
        queryOptions = { where: { address: option.address } };
    else if(isPaged(option) && !isSearch(option))
        queryOptions = { limit: option.limit, offset: option.offset };
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