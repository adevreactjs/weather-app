import { render, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import TextField from '@mui/material/TextField';
import store from '../../store';
import userEvent from '@testing-library/user-event';

const onChange = jest.fn();
describe('Home components', () => {
  it('Home render', () => {
    const view = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(view).toMatchSnapshot();
    expect(screen.queryByRole('listitem')).toBeNull();
  });
  it('render title page', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(screen.getByText('Weather City')).toBeInTheDocument();
  });
  it('render input', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('render button', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('work onChange', () => {
    render(<TextField value='' onChange={onChange}></TextField>);
    userEvent.type(screen.getByRole('textbox'), 'Днепр');
    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
