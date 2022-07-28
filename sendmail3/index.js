const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  const { DefaultAzureCredential } = require('@azure/identity');
  const { SecretClient } = require('@azure/keyvault-secrets');
  const credential = new DefaultAzureCredential();
  const vaultName = 'sendemail2KV';
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new SecretClient(url, credential);

  const userRetrievedSecret = await client.getSecret('username3');
  const username3 = userRetrievedSecret.value;
  const pwdRetrievedSecret = await client.getSecret('password3');
  const password3 = pwdRetrievedSecret.value;

  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: username3,
      pass: password3,
    },
  });

  const mailOptions = {
    from: 'kffsande12345@outlook.com',
    to: 'kffsande12345@outlook.com',
    subject: req.body.emailSubject,
    text: req.body.emailBody,
    html:
      '<div><table><thead><tr><th>Product ID</th><th>Name</th></tr></thead><tbody>' +
      req.body.emailBody +
      '<tr><td></td><td>$' +
      req.body.orderTotal +
      '</td></tr></tbody></table></div>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Sent: ' + info.response);
    }
  });
};
