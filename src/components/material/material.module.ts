import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material'
import { MatMenuModule } from '@angular/material'
import { MatTabsModule } from '@angular/material'
import { MatSidenavModule } from '@angular/material'
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

@NgModule({
    declarations: [],
    exports: [
        MatCheckboxModule,
        MatToolbarModule,
        MatMenuModule,
        MatTabsModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: []
})

export class MaterialModule { }
