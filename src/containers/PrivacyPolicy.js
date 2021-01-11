import React from 'react';
import { Typography } from 'antd';
import {Helmet} from 'react-helmet';
import './Style.css'

const { Title, Paragraph } = Typography

function PrivacyPolicy() {
    return (
    <div className='privacyPolicyPage'>
    <Helmet>
        <title>Privacy Policy - Fitex</title>
        <meta name="description" content="Fitex Privacy Policy page." />
    </Helmet>
        <Title>Privacy Policy</Title>
        <Title level={2}>Intro</Title>
            <Paragraph>
            Fitex knows that our users value their privacy and protection of personal data highly.
            We take the matter or protecting personal data very seriously.
            Please take a minute to read our privacy policy.
            </Paragraph>
        <Title level={2}>What does our privacy notice include?</Title>
            <Paragraph>
            The privacy policy of Fitex includes the privacy terms and conditions of our website fitex.ee.
            Our customer, who have agreed to the terms of use established by Fitex that provide how customers
            handle the data from us for providing the service, have been informed of the requirements of our
            privacy ploicy. We will always do our best to identify possible violations and upon discovery notify
            the customer, whose data has been misused as well as the law enforcement authorities.
            </Paragraph>
        <Title level={2}>Controller of personal data</Title>
            <Paragraph>
            The controller of personal data collected via Fitex web services is Fitex OÜ, located in Tartu.
            Contact information privacy.fitex@gmail.com , telephone +372 5300 7606.
            </Paragraph>
        <Title level={2}>The data transmitted by Users via Fitex web service</Title>
            <Paragraph>
            There are several different activities that a User can carry out on our website without the transmission
            of personal data. Such services include, for example, viewing general information of trainings and training
            groups that are listed publicly. General information includes sport type, location and coach name.
            A user’s profile is created upon the registration of a user name and this process involves recording personal
            data, including the User’s name and e-mail address. When using social authentication such as Google or Facebook
            for signing up in Fitex, User’s e-mail, name and public profile data will be collected from service provider.
            Using the Fitex web service produces data regarding the User’s choices of trainings and training groups, and
            the data that the User has added to their profile, including the sports that the User practices and city
            they are currently from.
            </Paragraph>
        <Title level={2}>Automatically registered data</Title>
            <Paragraph>
            Over the course of using Fitex web services, the following data is registered automatically: the User’s
            IP address and the approximate location based on the IP address; browser version; information about LocalStorage,
            and the pages that the User visits in our online environment.
            </Paragraph>
        <Title level={2}>Why do we collect data?</Title>
            <Paragraph>
            We do not sell or rent User data to third parties. We collect data so that Users could employ the health
            and sports services in the Fitex web service. Location data is collected so that Users could find the
            services nearest to them as quickly as possible. The data related to User’s training groups and trainings
            participation chosen via Fitex web service is collected for non-personal data processing (analytics) and
            for forwarding personalized direct marketing messages, provided that the User has given the corresponding
            consent.
            </Paragraph>
        <Title level={2}>Recipients of personal data</Title>
            <Paragraph>
            Data may be forwarded to different service providers employed by Fitex in the future. In each such instance
            Fitex will try its best to ensure that the service provider’s privacy requirements would be in accordance
            with currently valid legislation and the Users’ personal data would be stored and transmitted in a secure manner.
            </Paragraph>
        <Title level={2}>Where is Users’ personal data stored and how is it transmitted?</Title>
            <Paragraph>
            The personal data collected via Fitex web service is not transmitted to countries outside the European Union
            or to countries that lack personal data protection legislation in compliance with the standards of the
            European Union. Data is stored in servers located in a European Union member state.
            </Paragraph>
        <Title level={2}>Public personal data</Title>
            <Paragraph>
            When using the Fitex web service, the User (who has coach permission) agrees that other Users
            (without coach permission) are able to search for their publicly shared trainings’ information.
            The User (coach) has the possibility of limiting the visibility of training information by other Users
            while posting trainings only in private training groups.
            </Paragraph>
        <Title level={2}>LocalStorage</Title>
            <Paragraph>
            We use LocalStorage in our web service. LocalStorage includes small pieces of information that are stored
            by the User’s browser on the local disk of the User’s device. These allow us to check whether the User is
            logged in and which are the User’s preferred usage settings.
            </Paragraph>
        <Title level={2}>How is the User’s personal data protected?</Title>
            <Paragraph>
            User’s accounts in Fitex web service are protected by passwords, Google or Facebook account for ensuring
            safety and privacy. Be careful as a User and do not give out your password to third parties, do not use
            passwords that are easily guessed, and avoid using the same password in several web services.
            Do not leave your Fitex account logged in in unfamiliar devices.
            Fitex data requests are encrypted. Within the company, we employ reasonable technical and
            organizational-administrative solutions for transmitting personal data between employees and cooperation
            partners.
            Though we try our hardest and work towards keeping the User’s personal data protected and transmitting it
            safely every single day, we would like to remind you that transmitting information online is never 100% safe.
            Our websites contain links to other websites that may or may not be our partners. Fitex does not
            guarantee nor is it responsible for the way these websites handle personal data. Should the User move
            onto other webpages through the aforementioned links, the User must first specify the privacy settings of
            those pages. The same procedure applies to logging in through social media or using social media sharing
            buttons/links.
            </Paragraph>
        <Title level={2}>Duration of the storage of personal data</Title>
            <Paragraph>
            The data is stored until the User has a Fitex web service account or in instances when the data storage is
            required by legislation (such as the Accounting Act). After the User has deleted the account, the User’s
            data concerning sports preferred sports, trainings and training groups is made anonymous and used for
            analytic purposes. The data of deleted Users are removed from spare copies and logs within 90 days after
            deletion.
            </Paragraph>
        <Title level={2}>Correction and deletion of data</Title>
            <Paragraph>
            The User reserves the right to demand access, correction, and deletion of the data collected with the
            User’s consent at all times. In addition to that, the User has the right to stop unlawful data processing,
            withdraw consent, or to demand the transfer of the personal data. These procedures can be carried out under
            your profile options after the User logs into the Fitex web service account or send an e-mail to
            privacy.fitex@gmail.com .
            It has to be taken into account that it is not possible to use the Fitex web service once the User decides
            to disallow processing personal data or requests it to be deleted or transferred. Another aspect that has
            to be considered is that data cannot be deleted in its entirety because it may be stored on grounds other than the User’s consent.
            If Fitex deleted your User Account owing to a breach of the user agreement, you have the right to demand
            the deletion of your personal data by sending an e-mail to privacy.fitex@gmail.com. Fitex processes
            all such claims independently and informs the user of if and when the claim will be satisfied.
            </Paragraph>
        <Title level={2}>Personal data of children</Title>
            <Paragraph>
            Fitex services are available for use by minors. If you are a User under the age of 16, please consult your
            parents before setting up an account and do not forward any personal data without prior consent from
            parents. Should you discover that your underage child has set up a Fitex web service account against your
            will, please let us know at privacy.fitex@gmail.com .
            </Paragraph>
        <Title level={2}>Athletes’ registrations to trainings</Title>
            <Paragraph>
            In case of registration to trainings or requests to join training group by athlete, all of the athlete’s
            names, email and public profile data are saved to the Fitex database. Admin of the training group or
            training organizer is transmitted all the data of the registration.
            </Paragraph>
        <Title level={2}>Alternations to the Privacy Policy</Title>
            <Paragraph>
            Fitex develops, legislation changes and life goes on. From time to time we may find it necessary to make
            alternations to this privacy policy. We will notify our Users of such alternations via the web site
            or e-mail.
            </Paragraph>
        <Title level={2}>Data protection officers</Title>
            <Paragraph>
            You may contact the data protection officer of Fitex via e-mail at dpo.fitex@gmail.com  or on our general
            information e-mail at privacy.fitex@gmail.com.
            </Paragraph>
            <Paragraph>
            If after communicating with our data protection officer the User feels that Fitex does not fulfill the
            obligation of personal data protection with the required diligence and does not act in accordance
            with the present privacy policy, then you may inform the Estonian Data Protection Inspectorate, located
            in Tallinn, at Väike-Ameerika street 19, 10129, and may be found online at www.aki.ee.
            </Paragraph>
    </div>
    )
}

export default PrivacyPolicy;