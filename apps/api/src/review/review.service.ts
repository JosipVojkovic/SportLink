import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({ data: createReviewDto });
  }

  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.prisma.review.delete({ where: { id } });
  }
}
