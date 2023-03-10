# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### DB Schema Change and DB Data Change
First of all, we need to change the schema of the DB tables and ForeignKey relations.
#### Step 1. 
    - Add new `ID` field to Agent field with unique, primary key contraints, initially we can assign auto generated values using db clients
    - In case we are using ORM Client, this will be done by ORM migration. So we need to write migration script to update the DB.

    Estimated Hours: 3hr
    Acceptance Criteria: Agent table should have additional ID field as primary key, and migration script

#### Step 2 (optional).
    - Apply DataMigration Script to Agent model to update the id values
    In the previous step, we may had to use db clietns default functionality to add id values, but if we want to use ID field values with more meaningful data, then we can apply Data migration using backend code or DB functions. but it can be optional

    Estimated Hours: 2hr
    Acceptance Criteria: Migration script to update Agent ID with more meaningul data

#### Step 3.
    - Add Foreingkey contratints to Facility table and Shift table.
    It either can be done by manually on DB directly or via DB migration script

    Estimated Hours: 2hr
    Acceptance Criteria: Migration script to update Agent add foreingKey or DB update

### Backend Code Change
    Since we are using newly added ID field, we need to update the related backend codebase like including DB joins and some others.

    Estimated Hours: Depends on codebase, how many places it's used
    Acceptance Criteria: Newly generated report should show new agent IDs and make sure the changes are not breaking the application by either manual test and unit test.

### Testing
    Update the unit test and E2E test accordingly (can be included backend code change, but we can highlight and add new tasks for testing).

    Estimated Hours: Depends on codebase, how many places it's used
    Acceptance Criteria: Newly generated report should show new agent IDs and make sure the changes are not breaking the application by either manual test and unit test.
    Delivery: updated tests