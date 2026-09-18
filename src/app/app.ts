import { TUI_DARK_MODE, TuiRoot } from '@taiga-ui/core';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, TuiRoot],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly isDarkMode = inject(TUI_DARK_MODE);
  protected readonly theme = computed<'dark' | null>(() => this.isDarkMode() ? 'dark' : null)
}
