import '../../stylesheets/footer.scss'
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div class="footer-container">
			<div class="jackson">
				<h3 className='name'>
					Jackson Dooley
				</h3>
				<a className='links' target='_blank' href='https://github.com/jacksondooley'>
					<i class="fa-brands fa-github"></i>Github
				</a>
				<a className='links' target='_blank' href='https://www.linkedin.com/in/jacksondooley/'>
					<i class="fa-brands fa-linkedin"></i>LinkedIn
				</a>
				<a className='links' target='_blank' href='https://github.com/jacksondooley'>
					<i class="fa-brands fa-angellist"></i>AngelList
				</a>
			</div>
			<div class="spencer">
				<h3 className='name'>
					Spencer Lee
				</h3>
				<a className='links' target='_blank' href='https://github.com/Spencer-JLee'>
					<i class="fa-brands fa-github"></i>Github
				</a>
				<a className='links' target='_blank' href='https://github.com/jacksondooley'>
					<i class="fa-brands fa-linkedin"></i>LinkedIn
				</a>
				<a className='links' target='_blank' href='https://github.com/jacksondooley'>
					<i class="fa-brands fa-angellist"></i>AngelList
				</a>
			</div>
			<div class="will">
				<h3 className='name'>
					Will Corona
				</h3>
				<a className='links' target='_blank' href='https://github.com/wcorona269'>
					<i class="fa-brands fa-github"></i>Github
				</a>
				<a className='links' target='_blank' href='https://www.linkedin.com/in/william-corona/'>
					<i class="fa-brands fa-linkedin"></i>LinkedIn
				</a>
				<a className='links' target='_blank' href='https://angel.co/u/william-corona-2'>
					<i class="fa-brands fa-angellist"></i>AngelList
				</a>
			</div>
		</div>
	)
}

export default (Footer);

