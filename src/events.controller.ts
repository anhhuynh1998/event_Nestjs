import {  Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";
import { Event } from "./event.entity";
import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Controller('/events')
export class EventsController {
   
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>
    ){}

    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            where: { id: MoreThan(3)}
        })
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return await this.repository.findOne(id);
    }
    @Post()
    async create(@Body() input:CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        });
    }
    @Patch(':id')
    async    update(@Param('id') id,@Body() input:UpdateEventDto) {
       const event = await this.repository.findOne(id);
       return await  this.repository.save({
        ...event,
        ...input,
        when : input.when ? new Date(input.when) : event.when
       })
    }
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne(id);
        await this.repository.remove(event)
    }
}