import React from 'react'
import {
  Checkbox,
  FormControlLabel, Grid,
} from '@mui/material';
import { Controller } from 'react-hook-form';


const EmployeeStatuoryinfo = ({

  isPFChecked, handleCheckboxChange, isESIChecked, handleCheckboxESIChange,
  isLWFChecked, handleCheckboxLWFChange,

  control, StyledLabel,
  formData5, StyledInput, errors, openEdit, setFormData5

}) => {


  return (
    <Grid container>
      <Grid xs={12} container > {/* First Horizontal View page - 4 regarding... */}

        <Grid xs={6} container alignItems="center" paddingBottom={4}>
          <Grid item xs={4}>
            <StyledLabel>
              Aadhaar Number <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="aadhaarnumber"
              control={control}
              defaultValue={formData5.aadhaarnumber}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  error={!!errors.aadhaarnumber}
                  helperText={errors.aadhaarnumber ? errors.aadhaarnumber.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData5((prev) => ({
                      ...prev,
                      aadhaarnumber: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid xs={6} container alignItems="center" paddingBottom={4}>
          <Grid item xs={4}>
            <StyledLabel>
              PAN Number <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="pannumber"
              control={control}
              defaultValue={formData5.pannumber}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  error={!!errors.pannumber}
                  helperText={errors.pannumber ? errors.pannumber.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData5((prev) => ({
                      ...prev,
                      pannumber: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid xs={6} container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Passport Number
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="passportnumber"
              control={control}
              defaultValue={formData5.passportnumber}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.passportnumber}
                  helperText={errors.passportnumber ? errors.passportnumber.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData5((prev) => ({
                      ...prev,
                      passportnumber: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid xs={6} container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              UAN Number
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="uannumber"
              control={control}
              defaultValue={formData5.uannumber}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.uannumber}
                  helperText={errors.uannumber ? errors.uannumber.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData5((prev) => ({
                      ...prev,
                      uannumber: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


      </Grid>
      <Grid xs={12} container paddingTop={3}> {/* First Horizontal View page - 4 regarding... */}

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPFChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                  disabled={openEdit}
                />
              }
              label="Include PF"
            />
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isESIChecked}
                  onChange={handleCheckboxESIChange}
                  disabled={openEdit}
                  color="primary"
                />
              }
              label="Include ESI"
            />
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isLWFChecked}
                  onChange={handleCheckboxLWFChange}
                  disabled={openEdit}
                  color="primary"
                />
              }
              label="Include LWF"
            />
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid xs={4}>
            {isPFChecked &&
              <>
                <Grid xs={12} container alignItems="center" paddingBottom={2} style={{ visibility: isPFChecked ? 'visible' : 'hidden' }} >
                  <Grid item xs={4}>
                    <StyledLabel>
                      PF Number
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="pfnumber"
                      control={control}
                      defaultValue={formData5.pfnumber || ''}
                      render={({ field }) => (
                        <StyledInput
                          fullWidth
                          {...field}
                          variant="outlined"
                          error={!!errors.pfnumber}
                          helperText={errors.pfnumber ? errors.pfnumber.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData5((prev) => ({
                              ...prev,
                              pfnumber: e.target.value,
                            }));
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid xs={12} container alignItems="center" paddingBottom={2} style={{ visibility: isPFChecked ? 'visible' : 'hidden', }} >
                  <Grid item xs={4}>
                    <StyledLabel>
                      PF Join Date
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="pfjoindate"
                      control={control}
                      defaultValue={formData5.pfjoindate}
                      render={({ field }) => (
                        <StyledInput
                          fullWidth
                          {...field}
                          type="date"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.pfjoindate}
                          helperText={errors.pfjoindate ? errors.pfjoindate.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData5((prev) => ({
                              ...prev,
                              pfjoindate: e.target.value,
                            }));
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </>
            }
          </Grid>



          <Grid container xs={4}>
            {isESIChecked &&
              <Grid xs={12} container alignItems="" paddingBottom={2} style={{ visibility: isESIChecked ? 'visible' : 'hidden' }}>
                <Grid item xs={4}>
                  <StyledLabel>
                    ESI Number
                  </StyledLabel>
                </Grid>
                <Grid item xs={7}>
                  <Controller
                    name="esinumber"
                    control={control}
                    defaultValue={formData5.esinumber || ''}
                    render={({ field }) => (
                      <StyledInput
                        fullWidth
                        {...field}
                        variant="outlined"
                        error={!!errors.esinumber}
                        helperText={errors.esinumber ? errors.esinumber.message : ''}
                        FormHelperTextProps={{
                          style: { margin: 0, position: 'absolute', bottom: '-20px' }
                        }}
                        disabled={openEdit}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData5((prev) => ({
                            ...prev,
                            esinumber: e.target.value,
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            }

          </Grid>


          <Grid xs={4}>
            {isLWFChecked &&
              <Grid xs={12} container alignItems="center" paddingBottom={2} style={{ visibility: isLWFChecked ? 'visible' : 'hidden' }} >
                <Grid item xs={4}>
                  <StyledLabel>
                    LWF Number
                  </StyledLabel>
                </Grid>
                <Grid item xs={7}>
                  <Controller
                    name="lwfnumber"
                    control={control}
                    defaultValue={formData5.lwfnumber || ''}
                    render={({ field }) => (
                      <StyledInput
                        fullWidth
                        {...field}
                        variant="outlined"
                        error={!!errors.lwfnumber}
                        helperText={errors.lwfnumber ? errors.lwfnumber.message : ''}
                        FormHelperTextProps={{
                          style: { margin: 0, position: 'absolute', bottom: '-20px' }
                        }}
                        disabled={openEdit}
                        onChange={(e) => {
                          field.onChange(e);
                          setFormData5((prev) => ({
                            ...prev,
                            lwfnumber: e.target.value,
                          }));
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            }
          </Grid>

        </Grid>


      </Grid>
    </Grid>
  )
}

export default EmployeeStatuoryinfo
