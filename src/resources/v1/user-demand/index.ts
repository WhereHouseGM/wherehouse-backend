import * as express from 'express';
import { NextFunction } from 'express';
import { Op } from 'sequelize';
import WarehouseModel from '@models/warehouse.model';
import { BadRequestError } from '@errors/bad-request-error';
import UserDemandModel from '@models/user-demand.model';

export default function userDemands(app: express.Application) {
    app.get('/v1/user-demands', async function(req: express.Request, res: express.Response, next: NextFunction) {
        try {
            const userDemands = await getUserDemands(req.query);
            res.status(200).send({ userDemands: userDemands });
        } catch(err) {
            console.error(err);
            next(err);
        }
    });
}

interface WarehouseTypeInfo {
    id: number;
    name: string;
}

interface UserDemandInfo {
    id: number;
    minSize: number;
    maxSize: number;
    startDate: Date;
    endDate: Date;
    username: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    description: string;
    warehouseType: WarehouseTypeInfo;
    address: string;
}

async function getUserDemands(option: any): Promise<UserDemandInfo[]> {
    let queryOptions;
    const limit = parseInt(option.limit);
    const offset = parseInt(option.offset);

    if(isPaged(option)) queryOptions = { limit, offset };
    else if(!isPaged(option))  queryOptions = {};
    else throw new BadRequestError("쿼리 값을 다시 확인해주세요");

    try {
        const userDemands = await UserDemandModel.findAll(queryOptions);
        const userDemandInfos: UserDemandInfo[] = [];

        userDemands.forEach(userDemand => {
            userDemandInfos.push({
                id: userDemand.id,
                address: userDemand.address,
                companyName: userDemand.companyName,
                description: userDemand.description,
                email: userDemand.email,
                endDate: userDemand.endDate,
                maxSize: userDemand.maxSize,
                minSize: userDemand.minSize,
                phoneNumber: userDemand.phoneNumber,
                startDate: userDemand.startDate,
                username: userDemand.username,
                warehouseType: {
                    id: userDemand.type.id,
                    name: userDemand.type.name
                }
            });
        });
        return userDemandInfos;
    } catch(err) {
        console.error(err);
        throw err;
    }
}

function isPaged(option): boolean {
    return option.limit !== undefined && option.offset !== undefined;
}