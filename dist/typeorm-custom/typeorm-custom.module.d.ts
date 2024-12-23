import { DynamicModule } from '@nestjs/common';
export declare class TypeOrmCustomModule {
    static forFeature(repoClasses: {
        new (...params: any[]): any;
    }[]): DynamicModule;
}
