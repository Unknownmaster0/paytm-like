const formatDateToIST = (createdAt) => {
  const date = new Date(createdAt);

  // Use Intl.DateTimeFormat to convert UTC to IST directly
  const options = {
    timeZone: 'Asia/Kolkata', // Indian Standard Time (IST) time zone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);

  // Split the formatted result into date and time
  const formatted = formatter.format(date).replace(',', '').split(' ');

  const formattedDate = formatted[0].split('/').reverse().join('-');
  const formattedTime = formatted[1];

  return `${formattedDate} ${formattedTime}`;
};

const formatCurrency = (balance) => {
  formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  const amount = formatter.format(balance);
  return amount;
};

module.exports = {
  formatDateToIST,
  formatCurrency,
};
