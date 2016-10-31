export default function doFormTests() {
  console.log('Test form...');

  $(window).on('form-sent', (event, {form, data}) => {
    console.log(form, data);
  });

  $(window).on('validation-failed', (event, form, failed) => {
    console.log(form, failed);
  });
}
