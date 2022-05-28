import '../../stylesheets/footer.scss'
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<>
		<div class="footer-container">
			<div className='developers'>Developers</div>
			{/* <h2>developers</h2> */}
				<div class="jackson">
					<div class="footer-col">
						<div class="name">
							<h3 className='footer-name'>
								Jackson Dooley
							</h3>
						</div>
						<div class="pic">
							<img src='https://raw.githubusercontent.com/jacksondooley/Portfolio-Site/main/src/images/me.jpg'></img>

						</div>
						<div class="links">
							<a className='personal-link' target='_blank' href='https://github.com/jacksondooley'>
								<i class="fa-brands fa-github"></i>Github
							</a>
							<a className='personal-link' target='_blank' href='https://www.linkedin.com/in/jacksondooley/'>
								<i class="fa-brands fa-linkedin"></i>LinkedIn
							</a>
							<a className='personal-link' target='_blank' href='https://angel.co/u/jacksondooley'>
								<i class="fa-brands fa-angellist"></i>AngelList
							</a>

						</div>
					</div>
					
				</div>
				<div class="spencer">
					<div class="footer-col">
						<div class="name">
							<h3 className='footer-name'>
								Spencer Lee
							</h3>
						</div>
						<div class="pic">
							<img src='https://avatars.githubusercontent.com/u/96929144?v=4'></img>

						</div>
						<div class="links">
							<a className='personal-link' target='_blank' href='https://github.com/Spencer-JLee'>
								<i class="fa-brands fa-github"></i>Github
							</a>
							<a className='personal-link' target='_blank' href='https://www.linkedin.com/in/spencer-lee-693335186/'>
								<i class="fa-brands fa-linkedin"></i>LinkedIn
							</a>
							<a className='personal-link' target='_blank' href='https://angel.co/u/spencer-lee-13'>
								<i class="fa-brands fa-angellist"></i>AngelList
							</a>

						</div>
					</div>
					
				</div>
				<div class="will">
					<div class="footer-col">
						<div class="name">
							<h3 className='footer-name'>
								Will Corona
							</h3>
						</div>
						<div class="pic">
							<img src='https://avatars.githubusercontent.com/u/98494189?s=400&v=4'/>
						</div>
						<div class="links">
							<a className='personal-link' target='_blank' href='https://github.com/wcorona269'>
								<i class="fa-brands fa-github"></i>Github
							</a>
							<a className='personal-link' target='_blank' href='https://www.linkedin.com/in/william-corona/'>
								<i class="fa-brands fa-linkedin"></i>LinkedIn
							</a>
							<a className='personal-link' target='_blank' href='https://angel.co/u/william-corona-2'>
								<i class="fa-brands fa-angellist"></i>AngelList
							</a>

						</div>
					</div>
					
				</div>
			</div>
		</>
	)
}

export default (Footer);

