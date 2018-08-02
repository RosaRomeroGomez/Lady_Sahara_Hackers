# Tracking Sahara Dust Migration

Uncharted Software hosted our annual 24-hour Hackathon on Wednesday, July 11th.  Our theme was **“Visualizing the Environment”**. To get some inspiration for our project, we started googling *“Data visualization environment”* and found an interesting research article about [how the Sahara dust gets picked up in the wind](https://blogs.scientificamerican.com/guest-blog/dust-in-the-wind-how-data-visualization-can-help-the-environment/) and carried across to the Amazon rainforest each year.  

Inspired by this article, we wanted to visualize how much dust gets carried across the world and how this could impact climate change, environmental hazards and health risks. Given the limited time for this project, we decided to focus on one particular dataset consisting of aerosol optical depth measurements from the [CALIPSO](https://www-calipso.larc.nasa.gov/) satellite provided by [NASA](https://www.nasa.gov/). This dataset spans from June 2006 to December 2016 and it includes optical depth measurements on a daily basis.

After conducting research on the domain, we learned that aerosol optical depth is a measurement of how much direct sunlight is being prevented from touching the ground. It is caused by particles in the atmosphere like dust, smoke and pollution creating beams of particles that blocks sunlight by either absorbing the light, which can warm the atmosphere, or by scattering the light, which can cool the atmosphere. We also found that the CALIPSO dataset does not provide the altitude of aerosol layers, which could have been useful to display the height of the dust particles in the atmosphere.

## Data and Wrangling

As in any visualization project, one of the most time-consuming tasks was the data wrangling process. In total, we gathered 627,360 data points for eight years from 2006 to 2014.

We downloaded the dataset from NASA in CSV format per year. Each CSV file consisted of four main columns: 

|                                                                                                                  | 
|------------------------------------------------------------------------------------------------------------------| 
| 1) datetime (months since 01-JUN-2006 00:00:00)  | 
| 2) longitude                                                                                                     | 
| 3) latitude                                                                                                      | 
| 4) the mean dust optical depth                                                                                  | 


However, we wanted to provide higher granularity to identify potential seasonal patterns so we split our dataset by month and then grouped it by year. To do so, we wrote a Python script that generated one file in JSON format per month. The data set contained “bad flags”, otherwise defined as misreads from the satellite. After cleaning the “bad flags” our final dataset contained 561,095 points. Mean dust optical depth values ranged from unitless 0 to 1.

## Visualization Design

Each dust particle is drawn on a 3D globe (inspired by the [WebGL Globe Google Experiment Project](https://experiments.withgoogle.com/chrome/globe)) animated over time to illustrate dust density and movement patterns. Initially, we tried representing the particles as 3D bars, height and colour encoding optical depth. Though value peaks were discernible at a single moment in time, dust movement was difficult to perceive when the bars were animated over time.

Flattening the particles into 2D squares better amplified movement and density patterns. In addition to color, the squares are sized by optical depth to put more emphasis on areas with higher values.

Below shows the iterations of our design from 3D to 2D, with the finished product on the right:

Pressing “Play” will animate the particles on the globe. Clicking along the time slider will jump to specific time points.


## What did we learn about the data?


To be somewhat expected, we found that the areas with the highest mean optical depth were regions in the Sahara Desert. In particular, Algeria and Mauritania, remained in the top five countries for the highest mean optical depth throughout the eight years. While many regions followed expectations of optical density and dispersion, a deeper look into the visualization also displayed “pockets” of high mean optical depth around mountains and areas such as the Caribbean and the Gulf of Mexico.

From a time perspective, we found that dispersion, or movement of aerosol optical depth,  is seasonal with higher dispersion occurring during the summer months and lower dispersion during the winter months. We believed that exploring the altitude of aerosol layers in the atmosphere could provide more insight to the visualization by providing more dimensions, but this information is currently not provided by operating observational satellites.

You can get access to the visualization and try it out yourself [here](https://ladysaharahackers.github.io/). The source code is publicly available and hosted at [Github](https://github.com/ladysaharahackers/ladysaharahackers.github.io).

### References
https://www.esrl.noaa.gov/gmd/grad/surfrad/aod/
https://earthobservatory.nasa.gov/global-maps/MODAL2_M_AER_OD
https://www-calipso.larc.nasa.gov
https://experiments.withgoogle.com/chrome/globe


