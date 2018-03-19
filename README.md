# todo

* sfdx bfo:split -b false as default , always generate with false values
* clean up profiles, permissionsets, labels folders, do not clean up splits.

# onboarding

* install the salesforce cli https://developer.salesforce.com/tools/sfdxcli
* install nodejs
* configure proxy (use setproxy.bat / unsetproxy.bat)
  * if unsure , please use your mobile hotspot
* run the command sfdx (it should update itself as long as network connections are not interuppted)

# configure proxy

use setproxy.bat and unsetproxy.bat

# install bfo plugin

sfdx plugins install sfdx-bfo

# run the plugin

## Split files into a folder

sfdx bfo:split -s yourfolderwitholdformat -t targetfolderfornewformat

## Merge files into a folder

sfdx bfo:merge -s yourfolderwithsplitfiles -t targetfolderformergefiles

## doctor

specifies the state of your repo
