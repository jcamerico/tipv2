# Registrations

Registrations life cycle have been reviewed.

## Creating a registration

Sports can be _open_, _open with invitation code_, _open with manual approval (to be confirmed)_ or closed (not open for registration anymore). The workflow to add a registration will depend on that.

### OPEN
* User tries to register to competition.
* If there is no more space, user receives an error message and is not added to competition
    * To keep track we can add user with status REFUSED
* If there is still place, user is added to competition with status AWAITING PAYMENT. When payment is confirmed, user is fully REGISTERED.
* We can set a timeout during which users can be on AWAITING PAYMENT (48h)?
    * We can give sport admins the possibility to force the status to REGISTERED or REFUSED
    * User can cancel while it is not paid - status goes to CANCELLED BY USER

### OPEN WITH INVITATION CODE
* User tries to register to competition. He must provide a code to do so. 
* Codes have an expiration time and can only be used once
* If code is valid, no check on number of participants - user is added as AWAITING PAYMENT
* If code is not valid, user is added with status REFUSED (can be changed later if user provides valid code)
* If user used a valid code, no need to timeout on AWAITING PAYMENT
    * We can give sport admins the possibility to force the status to REGISTERED or REFUSED
        * User can cancel while it is not paid - status goes to CANCELLED BY USER


### OPEN WITH MANUAL APPROVAL (if really necessary...)
* User tries to register to competition.
* There is no need to check number of competitors - all checks will be manual
* User is added as PENDING APPROVAL
* When sport admins approve, user is added as AWAITING PAYMENT
    * They can still force the status to REGISTERED or REFUSED
* When user pays, status is changed to REGISTERED
* User can cancel while it is not paid - status goes to CANCELLED BY USER


## Unregistration workflow

* Backend flag to check if annulations are open
* Pop up or banner with annulation calendar
* When user clicks on annulation, message explaining in which cases annulation is valid and how much will be reimbursed
* User can type reasons for annulation (dropdown with preset reasons)
* User can decide to cancel one sport, all sports, soirée tickets 
* All status dates are tracked

* In backend we create an annulation request for the sport with status OPEN
* If sport approves, status changes on APPROVED BY SPORT and then registration team can check it
* If registration team approves it, request is AWAITING REIMBURSEMENT. The corresponding registration status is moved to CANCELLED WITH REIMBURSEMENT.
* When reimbursement is done, status is changed to REIMBURSED - transaction code should be provided
* If at any point the annulation request is refused, its status goes to REFUSED. The corresponding registration remains at its previous status REGISTERED.

## Lifecycle

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```