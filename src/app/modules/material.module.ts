import { NgModule } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
    imports: [
        MatListModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        DragDropModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressBarModule,
    ],
    exports: [
        MatListModule,
        MatTabsModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        DragDropModule,
        MatButtonModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressBarModule,
    ]
})
export class MaterialModule { }