# :label: Chrome extension to check DEV posts by #tag :label:


## What is Check DEV posts by #tag? :memo:
It is a chrome extension for [DEV, a community of software developers](https://dev.to/). Select a tag of interest and it will display 10 posts from the past week or the past month with the corresponding tag in order of popularity.
You can select multiple tags (or just one tag) and check the list of posts, just like checking SNS timeline for information. You can read the post you are interested in by clicking on the link. 
  
  Naturally, the best way to gather information is to visit [DEV community](https://dev.to/) directly. This extension is a simple tool to make DEV community more accessible and to create an opportunity to gather information more easily.

## Table of Contents :seedling:
  
  - [Chrome extension to check DEV posts by tag](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#label-chrome-extension-to-check-dev-posts-by-tag-label)
  
  - [What is check DEV community posts by tag?](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#what-is-check-dev-community-posts-by-tag-memo)
  
  - [Table of Contents](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#table-of-contents-seedling)
  
  - [Contents of each file](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#contents-of-each-file-rocket)
  
    - [Directory Structure](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#directory-structure)
    
    - [Details](https://github.com/TimTam-v2/project_cs50/blob/main/README.md#details)

## Contents of each file :rocket:
  ### Directory Structure
  ```
  project
  ├ manifest.json
  ├ popup
  |    └ popup.html
  |    └ popup.js
  |    └ styles.css
  └ images
       └ icon.png
       └ icon16.png
       └ icon48.png
       └ icon128.png
  ```
 ### Details
  - manifest.json
  
    This JSON object describes the extension's capabilities and configuration[^1].
  
  
  - popup/popup.html
  
    This file is the html that appears as a popup when you run the extension. 
  
    The tag name buttons displayed by default are hard-coded. This is a bad design, so I wondered whether to get the tag name of the button from the API or leave it hard-coded in place.
    However, I decided to focus on displaying tags for well-known languages and topics so that users unfamiliar with DEV community can easily use them.
  
  - popup/popup.js
    
    - When a user selects a tag name and time period (1 week or 1 month) displayed in popup.html, the top 10 most popular articles for the past 7 or 30 days containing that tag are displayed at the bottom of popup.html[^2].
    
    - Multiple tags can be selected, but articles are displayed consecutively for each tag.
      
      I wondered whether to design it so that only articles related to ther corresponding tag are displayed each time the tag button is selected, 
      but the concept was to have a list of articles, just like viewing the timeline of SNS, so I decided to display articles in this way.
  
      > e.g. )  If the user selects #webdev and #javascript, the 10 articles tagged #webdev, 10 articles tagged #javascript, and so on are displayed in a series.
    
    - When the user selects an article of interest, a new tab will take the user to the linked page.
    
    - If the user wants to see articles with tags not shown in popup.html, they can enter text in the form and select the button with that tag when it appears.
      This is done by retrieving a list of tag names (1000 only) from Forem's API, so you can search for any tag name that is included in the 1000 entries.
  
      > e.g. )  The #gcp button is not displayed by default, but if the user enters gcp in the form, the #gcp button will appear.
  
    - Selecting the Clear button clears the previously selected or searched content.
  
  - popup/styles.css
  
  - images/
  
    Stores DEV community icons and this project's icons.
  

  [^1]: [Chrome Developers](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)
  [^2]: The details of the API specifications can be found [Forem API V1 (1.0.0)](https://developers.forem.com/api/v1#tag/articles/operation/getArticles)
