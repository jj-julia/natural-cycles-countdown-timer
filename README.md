# Description & requirements

Frontend Code Challenge

My objective in this assignment is to create a countdown app built using this boilerplate (+ any
other tools of my choice) that follows the design specifications provided in this Figma file. The
app should work in portrait as well as in landscape mode while the text displayed on the screen
should always fill the whole width of the screen.

In my app, it should be possible to define the end date and the name of the event taking place on
that day. The countdown should always start from the current time and it should display the time
remaining to your specified end date in the following format: Days, Hours(h), Minutes(m), Seconds(s)
(e.g., 3 days, 15 h, 20 m, 5 s). To make sure the text always covers the entire screen width, it
should resize whenever necessary to achieve this objective.

The purpose of the solution is to “fit” the input text into an element in one line (no line breaks,
filling the whole width) using the maximum possible font-size.

The text fit solution should be reusable and that the event name, as well as the specified end date,
specified end date, are persisted between page reloads.

To test the requirements try:

### Countdown Display

- Enter a name and date
- Reload the page

### Dynamic Text Resizing

- Change the name of the event
- Swap between landscape and portrait mode
- In responsive mode, resize the window
- Try different screen sizes

### Basic Error Handling

- Entering a date in the past
- Leaving the input blank

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/jj-julia/natural-cycles-countdown-timer.git
   cdnatural-cycles-countdown-timer
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install angular cli:

   ```bash
   npm install -g @angular/cli
   ```

4. Run the application:

   ```bash
   ng serve
   ```

5. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any
   of the source files.

6. Run the tests:

   ```bash
   ng test
   ```

## Deployed Application

You can view the deployed version of the application at:
[natural-cycles-countdown-app.netlify.app](https://natural-cycles-countdown-app.netlify.app/)

## Suggestions for Improvement

- **Add Unit Tests**:
  - Add unit tests for all components, services, and directives.
  - I have set up a few very basic unit tests but I am not satisfied that they are testing the most
    important functionality of the application. For example, I have not tested the countdown service
    or the event service.
- **Resizer Directive**:
  - Make sure the resizer directive works on all elements, in call kinds of scenarios. To do this, I
    might do some quick example mapping with the developer as the user to scenarios (e.g. using with
    a button, a paragraph, a heading, etc., with different libraries (e.g. material) different font
    sizes, etc.). This would help to make the directive more robust.
- **Features**:
  - I have not added a view for what happens when the event is over. This would be the feature I
    would prioritize above all.
  - Create a better view for initial state and break out
  - I would consider allowing the user to add multiple events and display them on the screen. I
    would also consider allowing the user to edit or delete an event. **CSS and Theming**: -I have
    not modified the Angular material theme for the input boxes. I haven't revisited angular since
    they started using system tokens so I am keen to dive into how this works (note: if there was an
    existing design system used by the team I would consider creating custom components, or
    employing the component library available to me)
  - I would also to review my strategy for handling the responsive margins
- **Optimize Performance**:
  - Analyze and optimize the performance of the application for better load times.
- **Implement CI/CD**:
  - Set up Continuous Integration and Continuous Deployment pipelines for automated testing and
    deployment.
- **Add Accessibility Features**:
  - Add accessibility features to the application.
- **Consider Naming in the UI**:
  - Consider renaming the title to something more descriptive.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version
17.3.6.

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI Overview and Command Reference](https://angular.io/cli) page.
