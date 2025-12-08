# kidsLearning

KidsLearning is a small Angular application with simple, kid-friendly learning modules (ABC, Numbers, Shapes, Colors, Animals, Memory Match, Quiz and more). It is designed for easy local development, testing, and building for production.

**Features**
- **ABC**: Interactive alphabet viewer with speech and scoring (`src/app/features/abc`).
- **ABC Tap**: Tap-based ABC interaction (`src/app/features/abc-tap`).
- **Numbers**: Numbers 1..20 with emoji and dot views, speech and scoring (`src/app/features/numbers`).
- **Number Tap**: Tap-based number interactions (`src/app/features/number-tap`).
- **Colors**: Color learning module (`src/app/features/colors`).
- **Shapes**: Shape identification module (`src/app/features/shapes`).
- **Animals**: Animal names and emojis (`src/app/features/animals`).
- **Memory Match**: Simple card memory match game (`src/app/features/memory-match`).
- **Quiz**: Small form-based quiz with save/review behavior and speech (`src/app/features/quiz`).

**Key services/components**
- **SpeechService**: Wraps browser speech synthesis to speak prompts.
- **ScoreService**: In-memory scoring with `BehaviorSubject`.
- **Celebration & Navigation**: Shared UI components used across features.

**Repository layout (important paths)**
- `src/app/features/` — All feature modules/components (each feature has its own folder).
- `src/app/core/services/` — Core services like `speech.service.ts` and `score.service.ts`.
- `src/app/shared/components/` — Shared components such as celebration and navigation.

Getting started
- **Prerequisites**: Node.js (16+ recommended), npm, and Angular CLI if you prefer global `ng` commands.

Install dependencies
```
npm install
```

Run the app (development)
```
npm start
```
This runs the Angular dev server. Open `http://localhost:4200` in your browser.

Run tests
```
npm test
```
This runs the unit tests once (non-watch) by default. To generate a coverage report:
```
npm test -- --watch=false --code-coverage
```
Coverage output (if generated) will be under the `coverage/` folder.

Build for production
```
ng build --configuration production --base-href /kids/
```
Change `--base-href` as needed for your hosting path.

Notes on tests and coverage
- Several feature specs were added to assert component creation and to exercise key logic (navigation, speech calls, scoring, save/review flows). The test suite uses standalone components (moved from `declarations` to `imports` in specs) and small spies/mocks for `SpeechService` and `ScoreService` to keep tests deterministic.
- Some tests stub `setTimeout` to run callbacks immediately in-unit tests (keeps tests synchronous and avoids zone testing imports).

Development tips
- When adding new standalone components, update their specs to `imports: [YourComponent]` in the test module configuration instead of `declarations`.
- Use `ScoreService` to persist scores in-memory; tests can replace it with a spy object using the `providers` array in `TestBed.configureTestingModule`.

Contributing
- Fork the repo, create a branch, make changes, add/adjust tests, and open a PR for review.

License & contact
- Add your project license here and contact info if you want contributors to reach you.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
