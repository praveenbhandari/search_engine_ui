import React from 'react';

function TermsnCondition() {
  return (
    <div style={{ paddingTop: '70px', paddingLeft: '100px', paddingRight: '100px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
    <center>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Terms and Conditions</h2>
    </center>
    <div style={{ lineHeight: '1.6', textAlign: 'justify' }}>
      <p style={{ marginBottom: '20px' }}>
        <strong>Use of Services:</strong> By accessing or using our services, you agree to be bound by these terms.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Subscription Plans:</strong> We offer subscription plans with varying features and pricing. We reserve the right to change pricing, features, or terminate plans at our discretion. Any changes will be communicated to users in advance.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Cancellation:</strong> Once a subscription is initiated, it can be cancelled for the following months by emailing us at <a href="mailto:contactus@humanrightsdossier.com" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>contactus@humanrightsdossier.com</a> or by clicking on the cancel subscription button in the accounts section. However, the cancellation shall be effective from the next billing cycle.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Refund:</strong> We do not offer refunds for any subscription fees paid. All fees are non-refundable, even if the subscription is cancelled or terminated before the end of the billing cycle.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Intellectual Property:</strong> All content and intellectual property rights related to the services belong to Empirilex Private Limited. You may not use, reproduce, or distribute any content without our prior written consent.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Limitation of Liability:</strong> We are not liable for any damages, including but not limited to loss of profits, data, or goodwill, arising from the use or inability to use our services.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Governing Law:</strong> These terms are governed by the laws of India. Any disputes arising out of or in connection with these terms shall be resolved in the courts of Mumbai.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Modification:</strong> We reserve the right to modify or discontinue any subscription plan at our discretion. In the event of plan modification, users will be notified in advance of any changes to pricing or features.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Exceptions:</strong> In rare circumstances we may provide a partial refund or credit at our sole discretion.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>No Obligation:</strong> We have no obligation to provide refunds or credits for any reason, including but not limited to dissatisfaction with the service, changes in personal circumstances, or account termination.
      </p>
    </div>
  </div>
  
  
  );
}

export default TermsnCondition;
