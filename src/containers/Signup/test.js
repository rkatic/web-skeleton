import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { SignupComponent, validate } from './';
import * as Actions from '../../actions/auth';

describe('Signup component', () => {
  const mockDispatch = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };
  const wrapper = shallow(
    <SignupComponent
      dispatch={mockDispatch}
      form="Form"
      handleSubmit={() => {}}
      router={mockRouter}
      submitting={false}
    />
  );
  const instance = wrapper.instance();
  Actions.signupFetch = jest.fn((values, cb) => cb());

  it('validate function success', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    const errors = validate(values);

    expect(errors).toEqual({ email: null, password: null });
  });

  it('validate function fail', () => {
    const values = fromJS({
      email: 'notAnEmail',
      password: undefined,
    });
    const errors = validate(values);

    expect(errors).toEqual({
      email: 'Invalid e-mail address.',
      password: 'Required field.',
    });
  });

  it('handleSignup method', () => {
    const values = fromJS({
      email: 'test@email.com',
      password: 'Aa123456',
    });
    instance.handleSignup(values);

    expect(Actions.signupFetch)
      .toHaveBeenCalledWith(values, jasmine.any(Function));
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
