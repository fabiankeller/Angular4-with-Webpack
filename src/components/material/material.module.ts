import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material'
import { MatMenuModule } from '@angular/material'

@NgModule({
    declarations: [],
    exports: [
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule
    ],
    providers: [],
    bootstrap: []
})

export class MaterialModule {}