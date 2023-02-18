import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(`LTC`)
    .setDescription(`Lab Of Things Corporation - Project 2`)
    .setVersion(`1.0`)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
};
