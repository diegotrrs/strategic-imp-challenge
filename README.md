# Typescript Recruitment Exercise

## Background

We are creating an API gateway that provides a single API facade that in turn can communicate with multiple other different “supplier” APIs; mapping the request/responses appropriately. This provides consumers a consistent API irrespective of the underlying supplier API.

## Problem

As part of this we have to map a set of key value pairs into other key value pairs before sending on - this may be a straightforward map changing the name and/or value “x” to “y” or this could be more complicated where we need to map from a single pair to multiple pairs.

There are a number of standard keys the gateway uses e.g. LINE_PROFILE, LINE_ID, SERVICE_ID, RETAILER_ID.

The keys and/or values need to be configurable per supplier. A supplier may use the same key or have a different one e.g.

<table>
  <tr>
    <td>
      <pre>{
  "name": "LINE_ID",
  "value": "12345"
}</pre>
    </td>
    <td>to</td>
    <td>
      <pre>{
  "name": "IDENTIFIER",
  "value": "12345"
}</pre>
    </td>
  </tr>
</table>

The value may need to change depending on the supplier - with different mappings for different values e.g.

<table>
  <tr>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "1"
}</pre>
    </td>
    <td rowspan='2'>to</td>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "ABC/123"
}</pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "2"
}</pre>
    </td>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "CDE/123"
}</pre>
    </td>
  </tr>
</table>

For some suppliers, both the name and value may need to change e.g.

<table>
  <tr>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "1"
}</pre>
    </td>
    <td>to</td>
    <td>
      <pre>{
  "name": "PROFILE",
  "value": "1AB"
}</pre>
    </td>
  </tr>
</table>

A supplier may require mapping multiple key/values from a single key/value - or vice versa e.g.

<table>
  <tr>
    <td>
      <pre>{
  "name": "LINE_PROFILE",
  "value": "1"
}</pre>
    </td>
    <td>to</td>
    <td>
      <pre>{
  "name": "UPSTREAM",
  "value": "12"
},
{
  "name": "DOWNSTREAM",
  "value": "1000"
}</pre>
    </td>
  </tr>
</table>

New supplier APIs may be introduced with different mapping requirements and it is imperative that they can be onboarded via configuration without code changes or restarting the application.

Mappings also must be bidirectional to ensure the appropriate key/value is mapped when returned from the supplier to the consumer. If no mapping is configured for a particular key and/or value then the key and/or value should be passed through as is.

## Tasks

1. Give a definition and example of how you would specify the mapping configuration.
2. Implement the mapping functions from gateway to supplier and supplier to gateway so that the included testcase passes.

The gateway characteristics mapper expects an array of gateway characteristics and returns an array of supplier characteristics, and the supplier characteristics mapper does the inverse. The supplier identifier passed to each function specifies which supplier mapping definition should be used. Where and in what form these mapping definitions are stored is up to you; in a database? in-memory or persistent? - if you run out of time feel free to stub and describe your approach here.

## Notes

How long you spend on this is up to you but we suggest you don’t spend more than 2-3 hours. Submissions must include the full codebase + instructions and should be sent as an attachment or link.

Please do not fork this repository or submit answers as a public pull request.
