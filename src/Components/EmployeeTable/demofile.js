

// const fetchUsers = async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     // return response.json();
//     return response
// }




// const { data, dataUpdatedAt, error, errorUpdatedAt, failureCount, failureReason, fetchStatus, isError, isFetched, isFetchedAfterMount, isFetching, isLoading, isLoadingError, isPaused, isPending, isPlaceholderData, isRefetchError, isRefetching, isStale, isSuccess, refetch, status, } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
// })



// console.log(data, 'data')
// console.log(error, 'error')
// console.log(dataUpdatedAt, 'dataUpdatedAt')
// console.log(errorUpdatedAt, 'errorUpdatedAt')
// console.log(failureCount, 'failureCount')
// console.log(failureReason, 'failureReason')
// console.log(fetchStatus, 'fetchStatus')
// console.log(isError, 'isError')
// console.log(isFetching, 'isFetching')
// console.log(isFetched, 'isFetched')
// console.log(isFetchedAfterMount, 'isFetchedAfterMount')
// console.log(isLoading, 'isLoading')
// console.log(isLoadingError, 'isLoadingError')
// console.log(isPaused, 'isPaused')
// console.log(isPending, 'isPending')
// console.log(isPlaceholderData, 'isPlaceholderData')
// console.log(isRefetchError, 'isRefetchError')
// console.log(isRefetching, 'isRefetching')
// console.log(isStale, 'isStale')
// console.log(isSuccess, 'isSuccess')
// console.log(refetch, 'refetch')
// console.log(status, 'status')


<Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={6}>
        {activeStep === 0 && (
            <Grid item xs={4}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                    {/* Profile Image */}
                    <Grid item xs={12} container justifyContent="center" sx={{ paddingBottom: 2 }}>
                        <Avatar
                            sx={{ width: 200, height: 200 }}
                            alt="Profile Image"
                            src="https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?cs=srgb&dl=pexels-cottonbro-4629633.jpg&fm=jpg"
                        />
                    </Grid>

                    {/* Employee Name Field */}
                    <Grid item xs={12} paddingLeft={2}>
                        <StyledContainer container>
                            <StyledLabel>
                                Employee Name <span style={{ color: 'red' }}>*</span>
                            </StyledLabel>
                            <Controller
                                name="employeeName"
                                control={control}
                                defaultValue={formData.employeeName}
                                render={({ field }) => (
                                    <StyledInput
                                        {...field}
                                        variant="outlined"
                                        error={!!errors.employeeName}
                                        helperText={errors.employeeName ? errors.employeeName.message : ''}
                                        FormHelperTextProps={{
                                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                                        }}
                                    />
                                )}
                            />
                        </StyledContainer>
                    </Grid>
                </Grid>
            </Grid>
        )}
    </Grid>
</Box>






{/* <Grid item xs={6}>
                                        <Controller
                                            name="employeeName"
                                            control={control}
                                            defaultValue={formData.employeeName}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Employee Name*"
                                                    label={<span>Employee Name <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.employeeName}
                                                    helperText={errors.employeeName ? errors.employeeName.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid> */}
<Grid item xs={6}>
    <Controller
        name="employeeNumber"
        control={control}
        defaultValue={formData.employeeNumber}
        render={({ field }) => (
            <DarkTextField

                {...field}
                // label="Employee Number*"
                size="small"
                label={
                    <span>
                        Employee Number
                        <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.25rem' }}>
                            *
                        </span>
                    </span>
                }
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.employeeNumber}
                helperText={errors.employeeNumber ? errors.employeeNumber.message : ''}
            // disabled
            />
        )}
    />
</Grid>

{/* <Grid item xs={6}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue={formData.email}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Email Address*"
                                                    label={<span>Email Address <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.email}
                                                    helperText={errors.email ? errors.email.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid> */}

{/* <Grid item xs={6}>
                                        <Controller
                                            name="mobileNumber"
                                            control={control}
                                            defaultValue={formData.mobileNumber}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Mobile Number*"
                                                    label={<span>Mobile Number <span style={{ color: 'red' }}>*</span></span>}
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.mobileNumber}
                                                    helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid> */}

{/* <Grid item xs={6}>
                                        <Controller
                                            name="dateOfBirth"
                                            control={control}
                                            defaultValue={formData.dateOfBirth}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Date of Birth*"
                                                    label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                                                    type="date"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    InputLabelProps={{ shrink: true }}
                                                    error={!!errors.dateOfBirth}
                                                    helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid> */}

{/* 
                                    <Grid item xs={6}>
                                        <Controller
                                            name="gender"
                                            control={control}
                                            defaultValue={formData.gender}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    // label="Gender*"
                                                    label={<span>Gender<span style={{ color: 'red' }}>*</span></span>}
                                                    select
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.gender}
                                                    helperText={errors.gender ? errors.gender.message : ''}
                                                >
                                                    <MenuItem value="Male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                    <MenuItem value="Others">Others</MenuItem>
                                                </DarkTextField>
                                            )}
                                        />
                                    </Grid> */}

{/* <Grid item xs={6}>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue={formData.phone}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Phone Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.phone}
                                                    helperText={errors.phone ? errors.phone.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Controller
                                            name="bloodGroup"
                                            control={control}
                                            defaultValue={formData.bloodGroup}
                                            render={({ field }) => (
                                                <DarkTextField
                                                    {...field}
                                                    label="Blood Group"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    error={!!errors.bloodGroup}
                                                    helperText={errors.bloodGroup ? errors.bloodGroup.message : ''}
                                                />
                                            )}
                                        />
                                    </Grid> */}






///want to do this .......








<Grid item xs={8}>
    <Grid container columnSpacing={2} >

        <Grid item xs={4}>
            <Controller
                name="dateOfJoining"
                control={control}
                defaultValue={formData.dateOfJoining}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="Date of Joining*"
                        label={<span>Date of Joining <span style={{ color: 'red' }}>*</span></span>}
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dateOfJoining}
                        helperText={errors.dateOfJoining ? errors.dateOfJoining.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="emergencyContactName"
                control={control}
                defaultValue={formData.emergencyContactName}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="Emergency Contact Name*"
                        label={<span>Emergency Contact Name <span style={{ color: 'red' }}>*</span></span>}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.emergencyContactName}
                        helperText={errors.emergencyContactName ? errors.emergencyContactName.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="emergencyContactNumber"
                control={control}
                defaultValue={formData.emergencyContactNumber}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="Emergency Contact Number*"
                        label={<span>Emergency Contact Number  <span style={{ color: 'red' }}>*</span></span>}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.emergencyContactNumber}
                        helperText={errors.emergencyContactNumber ? errors.emergencyContactNumber.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="emergencyContactRelation"
                control={control}
                defaultValue={formData.emergencyContactRelation}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="Emergency Contact Relation (Should be blood relative)*"
                        label={<span>Emergency Contact Relation (Should be blood relative) <span style={{ color: 'red' }}>*</span></span>}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.emergencyContactRelation}
                        helperText={errors.emergencyContactRelation ? errors.emergencyContactRelation.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="fathersName"
                control={control}
                defaultValue={formData.fathersName}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="Father's Name"
                        label={<span>Father's Name <span style={{ color: 'red' }}>*</span></span>}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.fathersName}
                        helperText={errors.fathersName ? errors.fathersName.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="fathersOccupation"
                control={control}
                defaultValue={formData.fathersOccupation}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label="Father's Occupation"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.fathersOccupation}
                        helperText={errors.fathersOccupation ? errors.fathersOccupation.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="spouseName"
                control={control}
                defaultValue={formData.spouseName}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label="Spouse Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.spouseName}
                        helperText={errors.spouseName ? errors.spouseName.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="addressprof"
                control={control}
                defaultValue={formData.addressprof}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        // label="addressprof*"
                        label={<span> Address Prof <span style={{ color: 'red' }}> * </span></span>}
                        select
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.addressprof}
                        helperText={errors.addressprof ? errors.addressprof.message : ''}
                    >
                        <MenuItem value="Aadhaar">Aadhaar</MenuItem>
                        <MenuItem value="Driving License">Driving License</MenuItem>
                        <MenuItem value="Bank Statement">Bank Statement</MenuItem>
                        <MenuItem value="Phone Bill">Phone Bill</MenuItem>
                        <MenuItem value="Gas Bill">Gas Bill</MenuItem>
                    </DarkTextField>
                )}
            />
        </Grid>



        <Grid item xs={4}>
            <Controller
                name="countryOfOrigin"
                control={control}
                defaultValue={formData.countryOfOrigin}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label="Country of Origin"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.countryOfOrigin}
                        helperText={errors.countryOfOrigin ? errors.countryOfOrigin.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="nationality"
                control={control}
                defaultValue={formData.nationality}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.nationality}
                        helperText={errors.nationality ? errors.nationality.message : ''}
                    />
                )}
            />
        </Grid>

        <Grid item xs={4}>
            <Controller
                name="physicallyChallenged"
                control={control}
                defaultValue={formData.physicallyChallenged}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label="Physically Challenged (Yes/No)"
                        select
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.physicallyChallenged}
                        helperText={errors.physicallyChallenged ? errors.physicallyChallenged.message : ''}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </DarkTextField>
                )}
            />
        </Grid>

    </Grid>

</Grid> *



{/* <Grid item xs={4}>
            <Controller
                name="reportingmanager"
                control={control}
                defaultValue={formData.reportingmanager}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label={<span>Reporting Manager <span style={{ color: 'red' }}> * </span></span>}
                        select
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.reportingmanager}
                        helperText={errors.reportingmanager ? errors.reportingmanager.message : ''}
                    >
                        <MenuItem value="Kannan R">Kannan R</MenuItem>
                        <MenuItem value="Shamala Nagaveni">Shamala Nagaveni</MenuItem>
                        <MenuItem value="Sathis kumar">Sathis kumar</MenuItem>
                        <MenuItem value="Santhosh">Santhosh</MenuItem>
                    </DarkTextField>
                )}
            />
        </Grid> */}



{
    activeStep === 1 && (
        <>

            <Grid item xs={4}>
                <Controller
                    name="reportingmanager"
                    control={control}
                    defaultValue={formData.reportingmanager}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={[
                                { label: 'Kannan R', value: 'Kannan R' },
                                { label: 'Shamala Nagaveni', value: 'Shamala Nagaveni' },
                                { label: 'Sathis kumar', value: 'Sathis kumar' },
                                { label: 'Santhosh', value: 'Santhosh' }
                            ]}
                            // getOptionLabel={(option) => option.label}
                            onChange={(event, value) => field.onChange(value?.value)}
                            renderInput={(params) => (
                                <DarkTextField
                                    {...params}
                                    label={<span>Reporting Manager <span style={{ color: 'red' }}> * </span></span>}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.reportingmanager}
                                    helperText={errors.reportingmanager ? errors.reportingmanager.message : ''}
                                />
                            )}
                        />
                    )}
                />
            </Grid>





            <Grid item xs={4}>
                <Controller
                    name="reportingteamlead"
                    control={control}
                    defaultValue={formData.reportingteamlead}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Reporting Team Lead <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.reportingteamlead}
                            helperText={errors.reportingteamlead ? errors.reportingteamlead.message : ''}
                        >
                            <MenuItem value="Kannan R">Kannan R</MenuItem>
                            <MenuItem value="Shamala Nagaveni">Shamala Nagaveni</MenuItem>
                            <MenuItem value="Sathis kumar">Sathis kumar</MenuItem>
                            <MenuItem value="Santhosh">Santhosh</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="designation"
                    control={control}
                    defaultValue={formData.designation}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Designation <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.designation}
                            helperText={errors.designation ? errors.designation.message : ''}
                        >
                            {Designations.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                            {/* <MenuItem value="Female">Shamala Nagaveni</MenuItem>
                        <MenuItem value="Others">Sathis kumar</MenuItem>
                        <MenuItem value="Others">Santhosh</MenuItem> */}
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="department"
                    control={control}
                    defaultValue={formData.department}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Department <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.department}
                            helperText={errors.department ? errors.department.message : ''}
                        >
                            {Department.map((value, index) => (
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))}
                            {/* <MenuItem value="Male">Kannan R</MenuItem>
                        <MenuItem value="Female">Shamala Nagaveni</MenuItem>
                        <MenuItem value="Others">Sathis kumar</MenuItem>
                        <MenuItem value="Others">Santhosh</MenuItem> */}
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="team"
                    control={control}
                    defaultValue={formData.team}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Team <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.team}
                            helperText={errors.team ? errors.team.message : ''}
                        >
                            {Teams.map((value, index) => (
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))}
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="referrdby"
                    control={control}
                    defaultValue={formData.referrdby}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Referred By <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.referrdby}
                            helperText={errors.referrdby ? errors.referrdby.message : ''}
                        >
                            <MenuItem value="Male">Kannan R</MenuItem>
                            <MenuItem value="Female">Shamala Nagaveni</MenuItem>
                            <MenuItem value="Others">Sathis kumar</MenuItem>
                            <MenuItem value="Others">Santhosh</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="employmentstatus"
                    control={control}
                    defaultValue={formData.employmentstatus}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Employment Status <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.employmentstatus}
                            helperText={errors.employmentstatus ? errors.employmentstatus.message : ''}
                        >
                            <MenuItem value="Male">Probation</MenuItem>
                            <MenuItem value="Female">Confirmed</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="employeestatus"
                    control={control}
                    defaultValue={formData.employeestatus}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Employee Status <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.employeestatus}
                            helperText={errors.employeestatus ? errors.employeestatus.message : ''}
                        >
                            <MenuItem value="Male">Active</MenuItem>
                            <MenuItem value="Female">In Active</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="shift"
                    control={control}
                    defaultValue={formData.shift}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Shift <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.shift}
                            helperText={errors.shift ? errors.shift.message : ''}
                        >
                            {shifts.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="grade"
                    control={control}
                    defaultValue={formData.grade}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Grade <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.grade}
                            helperText={errors.grade ? errors.grade.message : ''}
                        >
                            <MenuItem value="L1">L1</MenuItem>
                            <MenuItem value="L2">L2</MenuItem>
                            <MenuItem value="L3">L3</MenuItem>
                            <MenuItem value="L4">L4</MenuItem>
                            <MenuItem value="L5">L5</MenuItem>
                            <MenuItem value="L4">L4</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="probabationperiod"
                    control={control}
                    defaultValue={formData.probabationperiod}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Employee Number*"
                            label={<span>Probabation Period <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.probabationperiod}
                            helperText={errors.probabationperiod ? errors.probabationperiod.message : ''}
                        // disabled
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="salaryofferred"
                    control={control}
                    defaultValue={formData.salaryofferred}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Employee Number*"
                            label={<span>Salary Offerred <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.salaryofferred}
                            helperText={errors.salaryofferred ? errors.salaryofferred.message : ''}
                        // disabled
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="attendancebonus"
                    control={control}
                    defaultValue={formData.attendancebonus}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Attendance Bonus <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.attendancebonus}
                            helperText={errors.attendancebonus ? errors.attendancebonus.message : ''}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="totalmonthlyctc"
                    control={control}
                    defaultValue={formData.totalmonthlyctc}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Employee Number*"
                            label={<span>Total Monthly ctc <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.totalmonthlyctc}
                            helperText={errors.totalmonthlyctc ? errors.totalmonthlyctc.message : ''}
                            disabled
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="totalyearlyctc"
                    control={control}
                    defaultValue={formData.totalyearlyctc}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Employee Number*"
                            label={<span>Total Yearly ctc <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.totalyearlyctc}
                            helperText={errors.totalyearlyctc ? errors.totalyearlyctc.message : ''}
                            disabled
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="billablestatus"
                    control={control}
                    defaultValue={formData.billablestatus}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> Billable Status <span style={{ color: 'red' }}>*</span></span>}
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.billablestatus}
                            helperText={errors.billablestatus ? errors.billablestatus.message : ''}
                        >
                            <MenuItem value="Billable">Billable</MenuItem>
                            <MenuItem value="Non-Billable">Non-Billable</MenuItem>
                            <MenuItem value="Partially">Partially Billed</MenuItem>
                        </DarkTextField>
                    )}
                />
            </Grid>

        </>
    )
}




{
    activeStep === 2 && (
        <>
            <Grid item xs={4}>
                <Controller
                    name="previousOrganizationName1"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Previous Organization Name 1 <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.previousOrganizationName1}
                            helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="designation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Designation <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.designation}
                            helperText={errors.designation ? errors.designation.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="totalExperience"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Total Experience (Years) <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.totalExperience}
                            helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                            disabled // Total Experience is read-only
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>

            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="previousOrganizationName1"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Previous Organization Name 1 <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.previousOrganizationName1}
                            helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="designation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Designation <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.designation}
                            helperText={errors.designation ? errors.designation.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="totalExperience"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Total Experience (Years) <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.totalExperience}
                            helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                            disabled // Total Experience is read-only
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>

            </Grid>


            <Grid item xs={4}>
                <Controller
                    name="previousOrganizationName1"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Previous Organization Name 1 <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.previousOrganizationName1}
                            helperText={errors.previousOrganizationName1 ? errors.previousOrganizationName1.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="designation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Designation <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.designation}
                            helperText={errors.designation ? errors.designation.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="dateOfBirth"
                    control={control}
                    // defaultValue={formData.dateOfBirth}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Date of Birth*"
                            label={<span>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    name="totalExperience"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span>Total Experience (Years) <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.totalExperience}
                            helperText={errors.totalExperience ? errors.totalExperience.message : ''}
                            disabled // Total Experience is read-only
                        />
                    )}
                />
            </Grid>

        </>
    )
}






{
    activeStep === 3 && (
        <>
            <Grid item xs={4}>
                <Controller
                    name="aadhaarnumber"
                    control={control}
                    defaultValue={formData.aadhaarnumber}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Mobile Number*"
                            label={<span>Aadhaar number <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.aadhaarnumber}
                            helperText={errors.aadhaarnumber ? errors.aadhaarnumber.message : ''}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="pannumber"
                    control={control}
                    defaultValue={formData.pannumber}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Mobile Number*"
                            label={<span>PAN number <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.pannumber}
                            helperText={errors.pannumber ? errors.pannumber.message : ''}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="passportnumber"
                    control={control}
                    defaultValue={formData.passportnumber}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Mobile Number*"
                            label={<span>Passport number <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.passportnumber}
                            helperText={errors.passportnumber ? errors.passportnumber.message : ''}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4}>
                <Controller
                    name="uannumber"
                    control={control}
                    defaultValue={formData.uannumber}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            // label="Mobile Number*"
                            label={<span>UAN number <span style={{ color: 'red' }}>*</span></span>}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.uannumber}
                            helperText={errors.uannumber ? errors.uannumber.message : ''}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={8}>

            </Grid>


            <Grid item xs={4}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPFChecked}
                            onChange={handleCheckboxChange}
                            color="primary"
                        />
                    }
                    label="include PF"
                />
            </Grid>

            <Grid item xs={4}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isESIChecked}
                            onChange={handleCheckboxESIChange}
                            color="primary"
                        />
                    }
                    label="include ESI"
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isLWFChecked}
                            onChange={handleCheckboxLWFChange}
                            color="primary"
                        />
                    }
                    label="include LWF"
                />
            </Grid>

            <Grid item xs={4} style={{ visibility: isPFChecked ? 'visible' : 'hidden' }}>
                <Controller
                    name="pfnumber"
                    control={control}
                    defaultValue={formData.pfnumber || ''}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label="PF Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.pfnumber}
                            helperText={errors.pfnumber ? errors.pfnumber.message : ''}
                        />
                    )}
                />
            </Grid>

            {/* ESI Number Input Field */}
            <Grid item xs={4} style={{ visibility: isESIChecked ? 'visible' : 'hidden' }}>
                <Controller
                    name="esinumber"
                    control={control}
                    defaultValue={formData.esinumber || ''}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label="ESI Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.esinumber}
                            helperText={errors.esinumber ? errors.esinumber.message : ''}
                        />
                    )}
                />
            </Grid>

            {/* LWF Number Input Field */}
            <Grid item xs={4} style={{ visibility: isLWFChecked ? 'visible' : 'hidden' }}>
                <Controller
                    name="lwfnumber"
                    control={control}
                    defaultValue={formData.lwfnumber || ''}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label="LWF Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.lwfnumber}
                            helperText={errors.lwfnumber ? errors.lwfnumber.message : ''}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={4} style={{ visibility: isPFChecked ? 'visible' : 'hidden', }}>
                <Controller
                    name="pfjoinddate"
                    control={control}
                    defaultValue={formData.pfjoinddate}
                    render={({ field }) => (
                        <DarkTextField
                            {...field}
                            label={<span> PF Join Date <span style={{ color: 'red' }}>*</span></span>}
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.pfjoinddate}
                            helperText={errors.pfjoinddate ? errors.pfjoinddate.message : ''}
                        />
                    )}
                />
            </Grid>
        </>
    )
}

{
    activeStep === 4 && (
        <>
            <Grid item xs={12}>

            </Grid>
            <Grid item xs={4}>

            </Grid>
            {/* <Grid item xs={4}>
            <Typography>
                Enter the type of payment
            </Typography>
            <Controller
                name="paymenttype"
                control={control}
                defaultValue={formData.paymenttype}
                render={({ field }) => (
                    <DarkTextField
                        {...field}
                        label={<span> Payment Type <span style={{ color: 'red' }}>*</span></span>}
                        select
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.paymenttype}
                        helperText={errors.paymenttype ? errors.paymenttype.message : ''}
                    >
                        <MenuItem value="0">Cash </MenuItem>
                        <MenuItem value="">Bank Transfer </MenuItem>
                        <MenuItem value="">Cheque</MenuItem>
                        <MenuItem value="">Demand Draft</MenuItem>
                    </DarkTextField>
                )}
            />
        </Grid> */}

            <Grid item xs={4} >
                <Typography variant="h6" gutterBottom>
                    Mention the mode of payment
                </Typography>
                <Controller
                    name="paymenttype"
                    control={control}
                    defaultValue={formData.paymenttype}
                    render={({ field }) => (
                        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.paymenttype}>
                            <InputLabel>
                                Payment Type <span style={{ color: 'red' }}>*</span>
                            </InputLabel>
                            <Select
                                {...field}
                                value={selectedPaymentType}
                                onChange={(e) => {
                                    field.onChange(e);
                                    handlePaymentTypeChange(e);
                                }}
                                label="Payment Type"
                            >
                                <MenuItem value="cash">Cash</MenuItem>
                                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                                <MenuItem value="cheque">Cheque</MenuItem>
                                <MenuItem value="demand_draft">Demand Draft</MenuItem>
                            </Select>
                            <FormHelperText>
                                {errors.paymenttype ? errors.paymenttype.message : ''}
                            </FormHelperText>
                        </FormControl>
                    )}
                />

                {selectedPaymentType === 'bank_transfer' && (
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Controller
                                name="bankname"
                                control={control}
                                defaultValue={formData.bankname}
                                render={({ field }) => (
                                    <DarkTextField
                                        {...field}
                                        label="Bank Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.bankname}
                                        helperText={errors.bankname ? errors.bankname.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Controller
                                name="branchname"
                                control={control}
                                defaultValue={formData.branchname}
                                render={({ field }) => (
                                    <DarkTextField
                                        {...field}
                                        label="Branch Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.branchname}
                                        helperText={errors.branchname ? errors.branchname.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="ifsccode"
                                control={control}
                                defaultValue={formData.ifsccode}
                                render={({ field }) => (
                                    <DarkTextField
                                        {...field}
                                        label="IFSC Code"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.ifsccode}
                                        helperText={errors.ifsccode ? errors.ifsccode.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="accountnumber"
                                control={control}
                                defaultValue={formData.accountnumber}
                                render={({ field }) => (
                                    <DarkTextField
                                        {...field}
                                        label={<span> Account Number <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.25rem' }}>  * </span></span>}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.accountnumber}
                                        helperText={errors.accountnumber ? errors.accountnumber.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>

        </>

    )
}