import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, useFormikContext } from 'formik';

import { TextFieldComponent } from '#common/components';
import * as classes from './character-search-form.styles';

export type StatusValue = 'alive' | 'dead' | 'unknown' | '';
export type GenderValue = 'female' | 'male' | 'genderless' | 'unknown' | '';

export interface CharacterSearchFormValues {
  searchTerm: string;
  statusValue: StatusValue;
  genderValue: GenderValue;
  filters: {
    name: boolean;
    status: boolean;
    species: boolean;
    type: boolean;
    gender: boolean;
  };
}

interface Props {
  onSearch: (values: CharacterSearchFormValues) => void | Promise<void>;
  onFiltersChange?: (values: CharacterSearchFormValues) => void;
}

const initialValues: CharacterSearchFormValues = {
  searchTerm: '',
  statusValue: '',
  genderValue: '',
  filters: {
    name: true,
    status: false,
    species: false,
    type: false,
    gender: false,
  },
};

const FormValuesObserver: React.FC<{
  onFiltersChange?: (values: CharacterSearchFormValues) => void;
}> = ({ onFiltersChange }) => {
  const { values } = useFormikContext<CharacterSearchFormValues>();

  React.useEffect(() => {
    onFiltersChange?.(values);
  }, [values, onFiltersChange]);

  return null;
};

export const CharacterSearchFormComponent: React.FC<Props> = ({ onSearch, onFiltersChange }) => {
  return (
    <Formik<CharacterSearchFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSearch}
    >
      {({ values, setFieldValue }) => {

        const handleStatusCheckbox = (checked: boolean) => {
          setFieldValue('filters.status', checked);

          if (!checked) {
            setFieldValue('statusValue', '');
          }
        };

        const handleGenderCheckbox = (checked: boolean) => {
          setFieldValue('filters.gender', checked);

          if (!checked) {
            setFieldValue('genderValue', '');
          }
        };

        return (
          <Form>
            <FormValuesObserver onFiltersChange={onFiltersChange} />
              <>
                <TextFieldComponent
                  label="Search character (name/species/type)"
                  name="searchTerm"
                />

                <FormGroup className={classes.filtersGroup}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.filters.name}
                        onChange={(e) =>
                          setFieldValue('filters.name', e.target.checked)
                        }
                      />
                    }
                    label="Name"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.filters.species}
                        onChange={(e) =>
                          setFieldValue('filters.species', e.target.checked)
                        }
                      />
                    }
                    label="Species"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.filters.type}
                        onChange={(e) =>
                          setFieldValue('filters.type', e.target.checked)
                        }
                      />
                    }
                    label="Type"
                  />
                </FormGroup>
              </>

              <FormGroup style={{ marginTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.filters.status}
                        onChange={(e) => handleStatusCheckbox(e.target.checked)}
                      />
                    }
                    label="Status"
                    style={{ marginRight: 0 }}
                  />

                  <FormControl size="small" style={{ minWidth: 180 }}>
                    <InputLabel id="status-label">Status value</InputLabel>
                    <Select
                      labelId="status-label"
                      value={values.statusValue}
                      label="Status value"
                      disabled={!values.filters.status}
                      onChange={(e) =>
                        setFieldValue('statusValue', e.target.value)
                      }
                    >
                      <MenuItem value="">Select status</MenuItem>
                      <MenuItem value="alive">alive</MenuItem>
                      <MenuItem value="dead">dead</MenuItem>
                      <MenuItem value="unknown">unknown</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 8,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.filters.gender}
                        onChange={(e) => handleGenderCheckbox(e.target.checked)}
                      />
                    }
                    label="Gender"
                    style={{ marginRight: 0 }}
                  />

                  <FormControl size="small" style={{ minWidth: 180 }}>
                    <InputLabel id="gender-label">Gender value</InputLabel>
                    <Select
                      labelId="gender-label"
                      value={values.genderValue}
                      label="Gender value"
                      disabled={!values.filters.gender}
                      onChange={(e) =>
                        setFieldValue('genderValue', e.target.value)
                      }
                    >
                      <MenuItem value="">Select gender</MenuItem>
                      <MenuItem value="female">female</MenuItem>
                      <MenuItem value="male">male</MenuItem>
                      <MenuItem value="genderless">genderless</MenuItem>
                      <MenuItem value="unknown">unknown</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </FormGroup>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '16px' }}
            >
              Search
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
