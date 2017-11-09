import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import './polyfills.js'
import './stylesheet/app.scss'
import { AppModule } from './components/app/app.module'

platformBrowserDynamic().bootstrapModule(AppModule);