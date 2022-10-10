console.log('Rounding...');

function roundToMultipleOf(value, multiple) {
  return Math.round(value / multiple) * multiple;
}

// Open all grouped entries
document
  .querySelectorAll('.cl-badge-same-entries-wrapper')
  .forEach((el) => el.click());

document
  .querySelectorAll('time-tracker-entry input-duration input')
  .forEach((input) => {
    const [hours, minutes, seconds] = input.value.split(':');

    // Handle edge case when seconds would affect whether we round minutes up or down
    // e.g. a value of 00:22:55
    const extraMinute = parseInt(seconds, 10) > 30 ? 1 : 0;

    let roundedMinutes = roundToMultipleOf(
      parseInt(minutes, 10) + extraMinute,
      15
    );

    // Set to 15 minutes if rounding would set this entry to zero
    if (hours === '00') {
      roundedMinutes = Math.max(roundedMinutes, 15);
    }

    const roundedValue = `${hours}:${roundedMinutes}:00`;

    console.log(input.value, '->', roundedValue);

    input.focus();
    input.value = '';

    // Deprecated, but the only way I could get this to work
    document.execCommand('insertText', false, roundedValue);

    setTimeout(() => input.blur());
  });

console.log('...rounding done.');
