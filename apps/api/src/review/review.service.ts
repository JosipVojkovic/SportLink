import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({ data: createReviewDto });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findOne(id: string) {
    const review = this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return review;
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  remove(id: string) {
    const review = this.prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.prisma.review.delete({ where: { id } });
  }
}
