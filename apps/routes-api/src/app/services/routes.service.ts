import { Route, RouteModel } from "../models/route.model"

export class RoutesService {

    async removeRoute(id: string, loggedUserId: string): Promise<Route> {
        const route = await this.getRouteById(id)
        if (route.userId !== loggedUserId) {
            throw new Error('You are not allowed to access this resource')
        }
        const result = await RouteModel
            .findByIdAndDelete(id)

        return result
    }

    async createRoute(newRoute: Route): Promise<Route> {
        const result = await RouteModel
            .create(newRoute)
        return result
    }

    async getRouteById(id: string): Promise<Route> {
        return RouteModel
            .findById(id)
            .exec()
    }

    async updateRoute(putRoute: Route, id: string, loggedUserId: string): Promise<Route> {
        const route = await this.getRouteById(id)
        if (route.userId !== loggedUserId) {
            throw new Error('You are not allowed to access this resource')
        }
        const result = await RouteModel
            .findByIdAndUpdate(id, putRoute)
        return result
    }

    async listRoutes(userId: string): Promise<Route[]> {
        return RouteModel.find({ userId }).exec()
    }
}
