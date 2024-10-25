import React from 'react'
import { Alert, Autocomplete, Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';



const EmployeeBasicInformation = ({ handleProfileUpload, profileImageUrl, control, interRequest,
    formData1, StyledInput, errors, openEdit, addressprof, setFormData1
}) => {

    const StyledLabel = styled('label')`
  font-weight: bold;
  margin-right: 16px; 
`;

    // console.log(fetchAvailable , 'cOMMINGNNGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG')

    return (
        <div>
            <Grid container xs={12} paddingLeft={0}  > {/* First Half  Parent Container */}

                <Grid item xs={2} > {/* Avatar container */}

                    <Grid item xs={12} paddingLeft={5} >
                        <input
                            type="file"
                            hidden
                            onChange={handleProfileUpload}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Avatar
                                sx={{ width: 200, height: 200, cursor: 'pointer' }}
                                alt="Profile Image"
                                src={profileImageUrl}
                            />
                        </label>
                    </Grid>


                </Grid>

                <Grid container xs={10} paddingLeft={6} columnGap={2} >  {/* Basic Details , like name and other container */}

                    <Grid container xs={6} spacing={1} >  {/* First Half container */}

                        <Grid container >
                            <Grid xs={6} container alignItems="center" paddingBottom={2} >
                                <Grid item xs={4} >
                                    <StyledLabel>
                                        First Name <span style={{ color: 'red' }}>*</span>
                                    </StyledLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="firstname"
                                        control={control}
                                        defaultValue={formData1.firstname}
                                        render={({ field }) => (
                                            <StyledInput
                                                fullWidth
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.firstname}
                                                helperText={errors.firstname ? errors.firstname.message : ''}
                                                disabled={openEdit}
                                                FormHelperTextProps={{
                                                    style: { margin: 0, position: 'absolute', bottom: '-20px', width: 'max-content' }
                                                }}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData1((prev) => ({
                                                        ...prev,
                                                        firstname: e.target.value,
                                                    }));
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>

                            <Grid xs={6} container alignItems="center" paddingBottom={2} >
                                <Grid item xs={4}>
                                    <StyledLabel
                                    >
                                        Last Name <span style={{ color: 'red' }}>*</span>
                                    </StyledLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        name="lastname"
                                        control={control}
                                        defaultValue={formData1.lastname}
                                        render={({ field }) => (
                                            <StyledInput
                                                fullWidth
                                                {...field}
                                                variant="outlined"
                                                error={!!errors.lastname}
                                                helperText={errors.lastname ? errors.lastname.message : ''}
                                                FormHelperTextProps={{
                                                    style: { margin: 0, position: 'absolute', bottom: '-20px', width: 'max-content' }
                                                }}
                                                disabled={openEdit}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setFormData1((prev) => ({
                                                        ...prev,
                                                        lastname: e.target.value,
                                                    }));
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Employee Number <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="employeeNumber"
                                    control={control}
                                    defaultValue={formData1.employeeNumber}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.employeeNumber}
                                            helperText={errors.employeeNumber ? errors.employeeNumber.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            disabled={(interRequest === 0) ? true : false}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    employeeNumber: e.target.value,
                                                }));
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Email Address <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue={formData1.email}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.email}
                                            helperText={errors.email ? errors.email.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }));
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Mobile Number <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="mobileNumber"
                                    control={control}
                                    defaultValue={formData1.mobileNumber}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.mobileNumber}
                                            helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    mobileNumber: e.target.value,
                                                }));
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid container xs={6} spacing={1} >  {/* Second Half  container */}

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Date of Birth <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="dateOfBirth"
                                    control={control}
                                    defaultValue={formData1.dateOfBirth}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            type="date"
                                            variant="outlined"
                                            InputLabelProps={{ shrink: true }}
                                            error={!!errors.dateOfBirth}
                                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'relative', bottom: '-8px' }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    dateOfBirth: e.target.value,
                                                }));
                                            }}

                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Gender <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue={formData1.gender || ''}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            select
                                            variant="outlined"
                                            error={!!errors.gender}
                                            helperText={errors.gender ? errors.gender.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            sx={{
                                                '& .MuiSelect-icon': {
                                                    fontSize: '30px',
                                                    color: '#2196f3'
                                                }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    gender: e.target.value,
                                                }));
                                            }}
                                        >
                                            {/* <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Others">Others</MenuItem> */}

                                            <MenuItem value={1}>Male</MenuItem>
                                            <MenuItem value={2}>Female</MenuItem>
                                            <MenuItem value={3}>Others</MenuItem>
                                        </StyledInput>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Phone Number <span style={{ color: 'red' }}>*</span>
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    defaultValue={formData1.phone}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.phone}
                                            helperText={errors.phone ? errors.phone.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    phone: e.target.value,
                                                }));
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid container alignItems="center" paddingBottom={2}>
                            <Grid item xs={4}>
                                <StyledLabel
                                >
                                    Blood Group
                                </StyledLabel>
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="bloodGroup"
                                    control={control}
                                    defaultValue={formData1.bloodGroup}
                                    render={({ field }) => (
                                        <StyledInput
                                            fullWidth
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.bloodGroup}
                                            helperText={errors.bloodGroup ? errors.bloodGroup.message : ''}
                                            FormHelperTextProps={{
                                                style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                            }}
                                            disabled={openEdit}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setFormData1((prev) => ({
                                                    ...prev,
                                                    bloodGroup: e.target.value,
                                                }));
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

            <Grid container xs={12} bgcolor={''} marginTop={2}  > {/* Second Half Parent Container */}

                <Grid container xs={4} bgcolor={''} > {/* Second Half child - 1  Container */}

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Date of Joining <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="dateOfJoining"
                                control={control}
                                defaultValue={formData1.dateOfJoining}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        type="date"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.dateOfJoining}
                                        helperText={errors.dateOfJoining ? errors.dateOfJoining.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                dateOfJoining: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                            <StyledLabel
                            >
                                Emergency Contact Name <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="emergencyContactName"
                                control={control}
                                defaultValue={formData1.emergencyContactName}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.emergencyContactName}
                                        helperText={errors.emergencyContactName ? errors.emergencyContactName.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                emergencyContactName: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                            <StyledLabel
                            >
                                Emergency Contact Number <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="emergencyContactNumber"
                                control={control}
                                defaultValue={formData1.emergencyContactNumber}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.emergencyContactNumber}
                                        helperText={errors.emergencyContactNumber ? errors.emergencyContactNumber.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                emergencyContactNumber: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                            <StyledLabel
                            >
                                Emergency Contact Relation (Should be blood relative) <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="emergencyContactRelation"
                                control={control}
                                defaultValue={formData1.emergencyContactRelation}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.emergencyContactRelation}
                                        helperText={errors.emergencyContactRelation ? errors.emergencyContactRelation.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                emergencyContactRelation: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container xs={4} bgcolor={''}> {/* Second Half child - 2 Container */}

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4} >
                            <StyledLabel
                            >
                                Father's Name <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="fathersName"
                                control={control}
                                defaultValue={formData1.fathersName}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.fathersName}
                                        helperText={errors.fathersName ? errors.fathersName.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                fathersName: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Father's Occupation
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="fathersOccupation"
                                control={control}
                                defaultValue={formData1.fathersOccupation}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.fathersOccupation}
                                        helperText={errors.fathersOccupation ? errors.fathersOccupation.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                fathersOccupation: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Spouse Name
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="spouseName"
                                control={control}
                                defaultValue={formData1.spouseName}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.spouseName}
                                        helperText={errors.spouseName ? errors.spouseName.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                spouseName: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>

                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                            <StyledLabel
                            >
                                Education (Highest Level) <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="education"
                                control={control}
                                defaultValue={formData1.education}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.education}
                                        helperText={errors.education ? errors.education.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                education: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>

                </Grid>

                <Grid container xs={4} bgcolor={''}> {/* Second Half child - 3 Container */}

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Country of Origin
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="countryOfOrigin"
                                control={control}
                                defaultValue={formData1.countryOfOrigin}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.countryOfOrigin}
                                        helperText={errors.countryOfOrigin ? errors.countryOfOrigin.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                countryOfOrigin: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Nationality
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="nationality"
                                control={control}
                                defaultValue={formData1.nationality}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.nationality}
                                        helperText={errors.nationality ? errors.nationality.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                nationality: e.target.value,
                                            }));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>
                        <Grid item xs={4} sx={{ paddingRight: '20px' }}>
                            <StyledLabel
                            >
                                Physically Challenged (Yes/No)
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="physicallyChallenged"
                                control={control}
                                defaultValue={formData1.physicallyChallenged || ''}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        select
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.physicallyChallenged}
                                        helperText={errors.physicallyChallenged ? errors.physicallyChallenged.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                physicallyChallenged: e.target.value,
                                            }));
                                        }}
                                    >
                                        {/* <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem> */}
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </StyledInput>
                                )}
                            />
                        </Grid>

                    </Grid>

                    <Grid container alignItems="center" paddingBottom={2}>

                        <Grid item xs={4}>
                            <StyledLabel
                            >
                                Address Proof <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                        </Grid>
                        <Grid item xs={7}>
                            <Controller
                                name="addressprofType"
                                control={control}
                                defaultValue={formData1.addressprofType || ''}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        select
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.addressprofType}
                                        helperText={errors.addressprofType ? errors.addressprofType.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                        disabled={openEdit}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData1((prev) => ({
                                                ...prev,
                                                addressprofType: e.target.value,
                                            }));
                                        }}

                                    >
                                        {addressprof?.map(item => (
                                            <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                        ))}
                                    </StyledInput>
                                )}
                            />
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default EmployeeBasicInformation
