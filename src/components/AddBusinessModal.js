import React, { Component } from 'react';
import emailjs from 'emailjs-com';

import {
  Button,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from 'reactstrap';

import InputMask from 'react-input-mask';

import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SpecialHoursInput } from './';

export default class AddBusinessModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      isNameInvalid: false,
      isPhoneInvalid: false,
      isAddressInvalid: false,
      isCityInvalid: false,
      isServicesInValid: false,
      specialHours: [],
    };

    // Bind class methods.
    this.toggleIsModalOpen = this.toggleIsModalOpen.bind(this);
    this.handleAddHours = this.handleAddHours.bind(this);
    this.handleRemoveHours = this.handleRemoveHours.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  toggleIsModalOpen() {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      isNameInvalid: false,
      isPhoneInvalid: false,
      isAddressInvalid: false,
      isCityInvalid: false,
      isServicesInValid: false,
      specialHours: [],
    }))
  }

  handleAddHours(day, timeText) {
    let { specialHours } = this.state;

    let isExistingDay = false;
    specialHours = specialHours.map(hourData => {
      if (hourData.day === day) {
        hourData.hours.push(timeText);
        isExistingDay = true;
      }

      return hourData;
    });

    if (!isExistingDay) {
      specialHours.push({
        day,
        hours: [timeText],
      })
    }

    this.setState(() => ({ specialHours }));
  }

  handleRemoveHours(removeDay, hoursIndex) {
    const { specialHours: stateHours } = this.state;

    let specialHours = stateHours.concat([]);

    const removeDayData = specialHours.filter(({ day }) => day === removeDay)[0];

    if (removeDayData.hours.length === 1) {
      specialHours = specialHours.filter(({ day }) => day !== removeDay);
    } else {
      removeDayData.hours.splice(hoursIndex, 1);
    }

    this.setState(() => ({ specialHours }));
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const {
      name: { value: businessName },
      phone: { value: phoneNumber },
      address: { value: streetAddress },
      city: { value: city },
      pickup: { checked: isPickup },
      driveThrough: { checked: isDriveThrough },
      delivery: { checked: isDelivery },
    } = event.target;

    const { specialHours: stateHours } = this.state;

    const specialHours = stateHours.map(({
      day, hours
    }) => {
      let fullDay;

      switch (day) {
        case 'Sun':
          fullDay = 'Sunday';
          break;
        case 'Mon':
          fullDay = 'Monday';
          break;
        case 'Tue':
          fullDay = 'Tuesday';
          break;
        case 'Wed':
          fullDay = 'Wednesday';
          break;
        case 'Thu':
          fullDay = 'Thursday';
          break;
        case 'Fri':
          fullDay = 'Friday';
          break;
        case 'Sat':
          fullDay = 'Saturday';
          break;
        default:
          fullDay = day;
          break;
      }

      return `${fullDay}: ${hours.join(', ')}`;
    });

    const services = [];
    if (isPickup) services.push('pickup');
    if (isDriveThrough) services.push('drive-through');
    if (isDelivery) services.push('delivery');

    let menuId = `${businessName} ${city}`.replace(/[^\w\s]/gi, '').replace(/_/gi, '');
    menuId = menuId.replace(/ /gi, '-').toLowerCase();

    const data = {
      businessName,
      phoneNumber,
      streetAddress,
      city,
      services: JSON.stringify(services, null, 4),
      specialHours: specialHours.length > 0 ? JSON.stringify(specialHours, null, 4) : false,
      menuId,
    };

    const isPhoneInvalid = phoneNumber === '' || phoneNumber.includes('_');
    const isServicesInValid = !isPickup && !isDelivery && !isDriveThrough;

    if (!businessName || isPhoneInvalid || !streetAddress || !city || isServicesInValid) {
      return this.setState(() => ({
        isPhoneInvalid,
        isServicesInValid,
        isNameInvalid: businessName === '',
        isAddressInvalid: streetAddress === '',
        isCityInvalid: city === '',
      }));
    }

    const { handleShowInfoModal } = this.props;
    emailjs.send('gmail','local_food_options', data, 'user_BmQcxG4DGNCxaVmMfVwwe')
      .then(() => {
        this.toggleIsModalOpen();
        handleShowInfoModal('Success', 'Thank you for suggesting this business. It should be available on the site within 24 hours.', true);
      })
      .catch(error =>
        (handleShowInfoModal('Failed', 'Unfortunately something went wrong. Please try again later.', false))
      );
  }

  render() {
    const {
      isModalOpen,
      isNameInvalid,
      isPhoneInvalid,
      isAddressInvalid,
      isCityInvalid,
      isServicesInValid,
      specialHours,
    } = this.state;

    const CloseButton = (
      <Button
        outline
        color="danger"
        onClick={this.toggleIsModalOpen}
        className="border-0 bg-transparent"
      >
        <FontAwesomeIcon
          fixedWidth
          size="lg"
          icon={faTimes}
        />
      </Button>
    );

    return (
      <div>
        <Button
          color="link"
          onClick={this.toggleIsModalOpen}
        >
          <FontAwesomeIcon
            fixedWidth
            size="lg"
            icon={faPlus}
            className="text-success"
          />
        </Button>

        <Modal
          isOpen={isModalOpen}
          toggle={this.toggleIsModalOpen}
          contentClassName="bg-dark text-extra-light"
        >
          <ModalHeader
            toggle={this.toggleIsModalOpen}
            close={CloseButton}
            className="align-items-center py-1 bg-darker border-warning shadow"
          >
            Add Business
          </ModalHeader>
          <ModalBody className="pb-5 overflow-auto">
            <p className="text-justify">
              Use the form below to suggest a new business and it should be added within 24 hours. Thank you.
            </p>
            <Form
              id="add-business-form"
              onSubmit={this.handleSubmitForm}
              className="business-form"
            >
              <div className="d-flex justify-content-between form-section">
                <FormGroup className="flex-fill long-form-group">
                  <Label for="name">Business Name</Label>
                  <Input
                    invalid={isNameInvalid}
                    type="text"
                    name="name"
                    id="name"
                    bsSize="sm"
                    placeholder="ABC Company"
                    className={`text-extra-light bg-darker-50 ${!isNameInvalid ? 'border-info' : ''}`}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <InputMask
                    mask="(999) 999-9999"
                    name="phone"
                    id="phone"
                    placeholder="(123) 456-7890"
                    className={`text-extra-light bg-darker-50 form-control form-control-sm ${isPhoneInvalid ? 'is-invalid' : 'border-info'}`}
                  />
                </FormGroup>
              </div>

              <div className="d-flex justify-content-between form-section">
                <FormGroup className="flex-fill long-form-group">
                  <Label for="address">Address</Label>
                  <Input
                    invalid={isAddressInvalid}
                    type="text"
                    name="address"
                    id="address"
                    bsSize="sm"
                    placeholder="123 Main Street"
                    className={`text-extra-light bg-darker-50 ${!isAddressInvalid ? 'border-info' : ''}`}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    invalid={isCityInvalid}
                    type="text"
                    name="city"
                    id="city"
                    bsSize="sm"
                    placeholder="City"
                    className={`text-extra-light bg-darker-50 ${!isCityInvalid ? 'border-info' : ''}`}
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <div className="d-flex align-items-baseline">
                  <Label for="services">Services</Label>
                  <FormText
                    color={isServicesInValid ? 'danger' : 'muted'}
                    className="mt-0 ml-2 mb-2"
                  >
                    {isServicesInValid && '* '}
                    1 service required
                  </FormText>
                </div>
                <div
                  id="services"
                  className={`d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center p-1 rounded border ${isServicesInValid ? 'is-invalid border-danger' : 'border-transparent'}`}
                >
                  <CustomInput
                    type="switch"
                    id="pickup"
                    name="pickup"
                    label="Pickup"
                  />
                  <CustomInput
                    type="switch"
                    id="driveThrough"
                    name="driveThrough"
                    label="Drive Through"
                  />
                  <CustomInput
                    type="switch"
                    id="delivery"
                    name="delivery"
                    label="Delivery"
                  />
                </div>
              </FormGroup>

              <FormGroup>
                <SpecialHoursInput
                  specialHours={specialHours}
                  handleAddHours={this.handleAddHours}
                  handleRemoveHours={this.handleRemoveHours}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="pb-0 pt-1 border-warning">
            <Button
              outline
              size="sm"
              type="submit"
              form="add-business-form"
              color="primary"
              className="business-submit-button"
            >
              Submit
            </Button>
            <Button
              outline
              size="sm"
              color="secondary"
              onClick={this.toggleIsModalOpen}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
