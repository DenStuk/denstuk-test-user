import { Repository } from "typeorm";
import { HttpError } from "../../../../domain/shared/errors/HttpError";
import { NotFoundError } from "../../../../domain/shared/errors/NotFoundError";
import { IRequestResult } from "../interfaces/IRequestResult";
import { BaseController } from "./BaseController";

export class CrudController<TEntity> extends BaseController {

    public _repository: Repository<TEntity>;

    public constructor(repository: Repository<TEntity>) { 
        super();
        this._repository = repository;
    }

    public async find() {
        try { return this.serializeResult(200, await this._repository.find()); } 
        catch (err) { throw new HttpError(err.statusCode, err.message) }
    }

    public async findOne(id: string | number) {
        try { return this.serializeResult(200, this._repository.findOne(id)); }
        catch (err) { throw new HttpError(err.statusCode, err.message) }
    }

    public async create(createDto: any) {
        try {
            const entity = this._repository.create({ ...createDto });
            await this._repository.save(entity);
            return this.serializeResult(201);
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

    public async updateById(updateDto: any, id: string | number) {
        try {
            const entity = await this._repository.findOne(id);
            if (!entity) { throw new NotFoundError(`Not found`); }
            await this._repository.update(id, { ...updateDto });
            return this.serializeResult(203);
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

    public async deleteById(id: string | number) {
        try {
            await this._repository.delete(id);
            return this.serializeResult(203);
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

}