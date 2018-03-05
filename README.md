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

sfdx bfo:cleanup -s yourfolderwitholdformat -t targetfolderfornewformat
