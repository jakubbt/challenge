import { injectable } from 'tsyringe';
import createHttpError from 'http-errors';
import { Door } from '@/models/Door';
import { UseCase } from '@/server/lib/UseCase';
import { DoorRepository } from '@/server/repositories/DoorRepository';
import { BuildingRepository } from '@/server/repositories/BuildingRepository';
import { ApartmentRepository } from '@/server/repositories/ApartmentRepository';
import { DoorMapper } from '@/server/mappers/DoorMapper';

interface Context {
  doorId: string;
}

@injectable()
export class GetDoorByIdUseCase implements UseCase<Door, Context> {
  constructor(
    private doorRepository: DoorRepository,
    private buildingRepository: BuildingRepository,
    private apartmentRepository: ApartmentRepository,
    private doorMapper: DoorMapper,
  ) {}

  public async execute({ doorId }: Context) {
    const doorDto = await this.doorRepository.getDoorById(doorId);

    if (!doorDto) {
      throw new createHttpError.NotFound(`no door found for id ${doorId}`);
    }

    const apartmentDto = doorDto.apartment_id
      ? await this.apartmentRepository.getApartmentById(doorDto.apartment_id)
      : undefined;

    const buildingDto = await this.buildingRepository.getBuildingById(
      doorDto.building_id,
    );

    if (!buildingDto) {
      throw new createHttpError.NotFound(
        `no building found for id ${doorDto.building_id}`,
      );
    }

    if (!apartmentDto) {
      throw new createHttpError.NotFound(
        `no apartment found for id ${doorDto.apartment_id}`,
      );
    }

    return this.doorMapper.toDomain(
      doorDto,
      {
        [buildingDto.id]: buildingDto,
      },
      {
        [apartmentDto.id]: apartmentDto,
      },
    );
  }
}
