

export class App {
  configureRouter(config, router) {
    config.title = 'Home';

    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Login' },
      { route: 'location',     name: 'location', moduleId: 'location',nav: true, title: 'Create Locations' },
    ]);

    this.router = router;
  }
}
